var app = angular.module('multiply', []);

app.controller('multiplyController', function ($scope) {
    $scope.bases = [
		{ name: "Decimal", value: 10 },
		{ name: "Binary", value: 2 },
		{ name: "Hex", value: 16 }
    ];
    $scope.matrixBase = $scope.bases[0].value;
    $scope.matrixSize = 10;

    $scope.matrix = [];

    $scope.matrix = CreateMatrix($scope.matrixSize, $scope.matrixBase);

    $scope.$watch(function () {
        $scope.matrix = [];
        $scope.matrix = CreateMatrix($scope.matrixSize, $scope.matrixBase);
    });

    $scope.setColor = function (row, col) {
        debugger;
        var isPrime = checkPrime(row, col);

        if (angular.equals(row, col)) {
            return { "background-color": "grey" }
        }
        else {
            if (isPrime == 1) {
                return { "background-color": "green" }
            }
            else {
                return { "background-color": "white" }
            }
        }
    }

    $scope.mouseover = function (row, col) {

	   var base = $scope.matrixBase;
	   var a = parseInt($scope.matrix[row][0], base);
	   var b = parseInt($scope.matrix[col][0], base);
	   var c = (a*b).toString(base);
	   $scope.tips = a.toString(base) + " X " + b.toString(base)+" = " + c;
    }

});

function CreateMatrix(size, base) {
    if (size > 15)
        size = 15;
    if (size < 3)
        size = 3;

    var matrix = [];
    for (i = 1; i <= size; i++) {
        var row = [];
        for (j = 1; j <= size; j++) {
            row.push((i * j).toString(base));
        }
        matrix.push(row);
    }
    return matrix;
}

function checkPrime(a, b) {
    var res = a * b;
    var flag = 1;

    // using parseInt(res/2), ~~(res/2), (res/2>>0), Math.trunc(res/2), Math.floor(res/2) (not for negative), etc
    for (var i = 2; i <= ~~(res / 2); ++i) {
        if (res % i == 0) {
            flag = 0;
            break;
        }
    }

    return flag;
}
