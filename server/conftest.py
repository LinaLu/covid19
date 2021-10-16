import pytest

from model import train_the_model


@pytest.fixture
def test_model():
    return train_the_model()
