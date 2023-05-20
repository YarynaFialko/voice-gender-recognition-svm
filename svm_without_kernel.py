import numpy as np

class SVM:
    def __init__(self, learning_rate=0.001, lambda_param=0.01, num_iterations=1000):
        self.learning_rate = learning_rate
        self.lambda_param = lambda_param
        self.num_iterations = num_iterations
        self.w = None
        self.b = None

    def fit(self, X, y):
        n_samples, n_features = X.shape

        self.w = np.zeros(n_features)
        self.b = 0

        for _ in range(self.num_iterations):
            for idx, x_i in enumerate(X):
                condition = y[idx] * (np.dot(x_i, self.w) - self.b) >= 1
                if condition:
                    self.w -= self.learning_rate * (2 * self.lambda_param * self.w)
                else:
                    self.w -= self.learning_rate * (2 * self.lambda_param * self.w - x_i * y[idx])
                    self.b -= self.learning_rate * y[idx]

    def predict(self, X):
        approx = np.dot(X, self.w) - self.b
        return np.sign(approx)

    def output_vars(self):
        print(self.learning_rate)
        print(self.lambda_param)
        print(self.num_iterations)
        print(self.w)
        print(self.b)

    def load_vars(self, path):
        with open(path, "r") as file:
            self.learning_rate = float(file.readline())
            self.lambda_param = float(file.readline())
            self.num_iterations = int(file.readline())
            self.w = [float(x) for x in file.readline().strip("[]\n").split()]
            self.b = [ float(file.readline().strip("[]")) ]
