import pandas
from sklearn import model_selection
from sklearn.linear_model import LogisticRegression
import pickle


def train_the_model():
    url = "https://raw.githubusercontent.com/jbrownlee/Datasets/master/pima-indians-diabetes.data.csv"
    names = ['preg', 'plas', 'pres', 'skin', 'test', 'mass', 'pedi', 'age', 'class']
    dataframe = pandas.read_csv(url, names=names)
    array = dataframe.values

    x = array[:, 0:8]
    y = array[:, 8]
    test_size = 0.33
    seed = 7

    x_train, x_test, y_train, y_test = model_selection.train_test_split(x, y, test_size=test_size, random_state=seed)

    model = LogisticRegression()
    model.fit(x_train, y_train)
    return model


def save_the_model(model):
    filename = 'covid19_model_v1.sav'
    pickle.dump(model, open(filename, 'wb'))


if __name__ == '__main__':
    covid_model = train_the_model()
    save_the_model(covid_model)
