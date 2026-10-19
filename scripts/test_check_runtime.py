import importlib.util
import pathlib
import unittest

SPEC = importlib.util.spec_from_file_location(
    'check_runtime', pathlib.Path(__file__).with_name('check-runtime.py'))
check_runtime = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(check_runtime)


class ExposedPortTests(unittest.TestCase):
    def test_only_candidate_port_and_known_nginx_base_metadata_are_allowed(self):
        self.assertEqual(check_runtime.PORT, 8080)
        self.assertTrue(check_runtime.approved_exposed_ports({'8080/tcp': {}}))
        self.assertTrue(check_runtime.approved_exposed_ports({'80/tcp': {}, '8080/tcp': {}}))

    def test_only_8080_is_published_and_arbitrary_image_ports_are_rejected(self):
        for ports in (
            None,
            {},
            {'80/tcp': {}},
            {'443/tcp': {}, '8080/tcp': {}},
            {'80/tcp': {}, '8080/tcp': {}, '8443/tcp': {}},
            {'80/udp': {}, '8080/tcp': {}},
            {'80/tcp': {}, '8080/tcp': {'HostPort': '80'}},
        ):
            with self.subTest(ports=ports):
                self.assertFalse(check_runtime.approved_exposed_ports(ports))


if __name__ == '__main__':
    unittest.main()
