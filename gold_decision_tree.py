import pandas as pd
import cProfile     # noqa
import os
from sklearn.tree import DecisionTreeRegressor
from sklearn.metrics import mean_absolute_error
from sklearn.model_selection import train_test_split


# data taken from Monthly Gold Prices (1979-2021) on Kaggle
gold_data_path = os.path.abspath('gold.csv')  # noqa: E501
gold_data = pd.read_csv(gold_data_path)

# print(gold_data.describe())

gold_data = gold_data.dropna(axis=0)  # drops not available data

gold_data_features = ['Open', 'Low', 'Volume']  # features for the prediction
y = gold_data.Close  # prediction target
x = gold_data[gold_data_features]


train_x, validation_x, train_y, validation_y = train_test_split(x, y, random_state=1)   # splits the data up into training and validation data; seed 1 for rng  # noqa

gold_model = DecisionTreeRegressor(random_state=1)    # decision tree model

gold_model.fit(train_x, train_y)    # training

validation_predictions = gold_model.predict(validation_x)   # predictions based on validation features  # noqa

MAE = mean_absolute_error(validation_y, validation_predictions) # actual value vs prediction value  # noqa

print(f"Non-Optimized Model MAE: {MAE} \n")


# model optimization: checks to see the amount many leaf nodes needed for a better MAE   # noqa


def getMAE(leaf_nodes, train_x, train_y, val_x, val_y): # function for checking other tree sizes    # noqa
    model = DecisionTreeRegressor(max_leaf_nodes=leaf_nodes, random_state=1)
    model.fit(train_x, train_y)
    val_predict = model.predict(val_x)
    mae = mean_absolute_error(val_y, val_predict)
    return(mae)


leafs_to_try = [10, 30, 50, 70, 100, 150, 200, 300, 400, 500, 600, 1000]    # other tree sizes  # noqa

MAEvalue = {}   # empty dictionary for the for loop

for i in leafs_to_try:  # iterates through other tree sizes and stores the outcomes in a hash table     # noqa
    MAEvalue[i] = getMAE(i, train_x, train_y, validation_x, validation_y)
    print(f"Max Leaf Node: {i}  \t\t MAE: {getMAE(i, train_x, train_y, validation_x, validation_y)}")   # noqa

optimal_tree_size = min(MAEvalue, key=MAEvalue.get)  # finds the smallest MAE value and outputs the key/tree size    # noqa
print(f"\n Optimal Tree Size: {optimal_tree_size}")


# final model

final_model = DecisionTreeRegressor(max_leaf_nodes=optimal_tree_size, random_state=1)   # noqa

final_model.fit(x, y)   # model has been optimized, so there is no need for using validation data   # noqa

print(final_model.predict(x))
