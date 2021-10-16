

def test_an_young_person_has_a_low_probability_of_hospitalization(test_model):
    probability = test_model.predict([[1, 90, 62, 38, 2, 0.787, 40, 4]])
    assert probability == False
