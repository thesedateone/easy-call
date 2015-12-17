describe('SearchController ', function() {

  var $controller;

  beforeEach(module('ecSearch'));

  beforeEach(inject(function (_$controller_) {
    $controller = _$controller_;
  }));


  describe('Searching', function() {
    it('should call the server with the search string', function() {});
    it('should update the model with the search results from the server', function() {});
    it('should set the no-results flag when the server returns no results', function() {});
    it('should clear the no-results flag when the server returns results', function() {});
  });


  describe('Autocomplete', function() {
    it('should invoke the search for strings over 2 characters', function() {});
    it('should not invoke the search for strings under 3 characters', function() {});
    it('should set the no-results flag for strings under 3 characters', function() {});
    it('should initially load with the no-results flag set', function() {});
  });

  describe('Dequeuing a record', function() {
    it('should call the server with the record id to dequeue', function() {});
    it('should set the record loading flag while waiting for a response', function() {});
    it('should clear the record loading flag while waiting for a response', function() {});
    it('should update the model with the record data returned from the server', function() {});
    it('should set an error on the model if the server returns an error code', function() {});
  });

});