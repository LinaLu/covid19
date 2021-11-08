from main import window, risk_context


def test_window_function_splits_list_to_pairs():
    result = list(window([1, 2, 3]))
    assert result == [(1, 2), (2, 3)]


def test_window_function_returns_empty_for_single_entry():
    result = list(window([1]))
    assert result == []


def test_risk_function_return_probability_in_context():
    result = risk_context(20)
    assert result == [{'covid': True, 'name': 'Covid19', 'value': 20}, {'covid': False, 'name': 'Heart disease', 'value': 17}]

    result = risk_context(0.00000001)
    assert result is None  # FIXME low bound not working

    result = risk_context(1.2)
    assert result == [{'covid': False, 'name': 'Influenza and pneumonia', 'value': 1.7},
                     {'covid': True, 'name': 'Covid19', 'value': 1.2},
                     {'covid': False, 'name': 'Suicide', 'value': 1.1}]
