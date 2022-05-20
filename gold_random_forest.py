import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
from sklearn.model_selection import train_test_split
import os


# data taken from Monthly Gold Prices (1979-2021) on Kaggle
gold_data_path = os.path.abspath('gold.csv')  # noqa: E501
gold_data = pd.read_csv(gold_data_path)

# print(gold_data.describe())

gold_data = gold_data.dropna(axis=0)  # drops not available data

gold_data_features = ['Open', 'Low', 'Volume']  # features for the prediction
y = gold_data.Close  # prediction target
x = gold_data[gold_data_features]

train_x, validation_x, train_y, validation_y = train_test_split(x, y, random_state = 0) # split data into training and validation datasets # noqa

gold_model = RandomForestRegressor(random_state=1)
gold_model.fit(train_x, train_y)

gold_prediction = gold_model.predict(validation_x)  # checks how off the data is on average # noqa

print(mean_absolute_error(validation_y, gold_prediction))

# now for the entire dataset

gold_prediction = gold_model.predict(x)

# output to a csv file

output = pd.DataFrame({'Date': gold_data.Date,
                       'Close': gold_prediction})
output.to_csv('gold_predictions.csv', index=False)
