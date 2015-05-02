describe('SearchController ', function() {
	beforeEach(module('ecSearch'));

	var $controller;

	beforeEach(inject(function (_$controller_) {
		$controller = _$controller_;
	}));

	describe('$scope.foo', function() {
		var $scope, controller;

		beforeEach(function() {
			$scope = {};
			controller = $controller('searchCtrl', { $scope: $scope });
		});

		it('should say hi', function() {
			expect($scope.foo).toBe("Hello!");
		});

	});

});
