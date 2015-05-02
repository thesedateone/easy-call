describe('SearchController ', function() {
	beforeEach(module('ecSearch'));

	var $scope, controller;

	beforeEach(inject(function (_$controller_) {
		$scope = {};
		controller = _$controller_('searchCtrl', { $scope: $scope });
	}));

	describe('Autocomplete', function() {

		it('should trigger when the search string changes', function() {});
		it('should invoke the search for strings over 2 characters', function() {});
		it('should not invoke the search for strings under 3 characters', function() {});
		it('should set the no-results flag on initial page load', function() {});
		it('should set the no-results flag for strings under 3 characters', function() {});
		it('should not clear the no-results flag for strings over 2 characters', function() {});

	});

	describe('Searching', function() {

		it('should call the server with the search string', function() {});
		it('should set the results loading flag while waiting for the server response', function() {});
		it('should set clear the results loading flag once the server responds', function() {});
		it('should update the model with the search results from the server', function() {});
		it('should set the no-results flag when the server returns no results', function() {});
		it('should set an error on the model if the server returns an error code', function() {});

	});

	describe('Dequeuing a record', function() {

		it('should call the server with the record id to dequeue', function() {});
		it('should set the record loading flag while waiting for a response', function() {});
		it('should clear the record loading flag while waiting for a response', function() {});
		it('should update the model with the record data returned from the server', function() {});
		it('should set an error on the model if the server returns an error code', function() {});

	});

});
