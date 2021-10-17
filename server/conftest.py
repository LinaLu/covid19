import pytest
from main import load_model


@pytest.fixture
def test_model():
    return load_model()
