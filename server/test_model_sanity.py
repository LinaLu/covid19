from pytest import approx

# Gender  (1 = Female 2 =male) / Neumonia / Age / Obese


def test_an_young_person_has_a_low_probability_of_hospitalization(test_model):
    probabilities = test_model.predict_proba([[0, 0, 20, 0]])
    probability_of_death = probabilities.tolist()[0][1]
    assert approx(probability_of_death, abs=1e-3) == 0.002


def test_an_old_and_sick_person_has_a_high_probability_of_hospitalization(test_model):
    probabilities = test_model.predict_proba([[2, 1, 90, 1]])
    probability_of_death = probabilities.tolist()[0][1]
    assert approx(probability_of_death, abs=1e-2) == 0.11
