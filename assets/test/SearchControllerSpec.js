describe('SearchController ', function() {

  var $controller;
  var $q;
  var $timeout;

  beforeEach(module('ecSearch'));

  beforeEach(inject(function (_$controller_, _$q_, _$timeout_) {
    $controller = _$controller_;
    $q = _$q_;
    $timeout = _$timeout_;
  }));


  describe('Searching', function() {
    
    var $scope;
    var serviceMock;

    beforeEach(inject(function () {
      serviceMock = jasmine.createSpyObj('CallRecord', ['getData']); 
      $scope = {};
      $controller('searchCtrl', { 
        $scope: $scope,
        CallRecord: serviceMock
      });
    }));

    it('should call the server with the search string', function() {
      serviceMock.getData.and.returnValue($q.when([]));       
      $scope.doSearch('810');

      expect(serviceMock.getData).toHaveBeenCalledWith('810');
    });

    it('should update the model with the search results from the server', function() {
      var response = ['foo', 'bar'];
      serviceMock.getData.and.returnValue($q.when(response));       
      $scope.doSearch('810');
      $timeout.flush();

      expect($scope.data).toEqual(response);
    });

    it('should set the no-results flag when the server returns no results', function() {
      serviceMock.getData.and.returnValue($q.when([]));       
      $scope.doSearch('810');
      $timeout.flush();

      expect($scope.data).toEqual([]);
      expect($scope.noresults).toBeTruthy();
    });

    it('should clear the no-results flag when the server returns results', function() {
      var response = ['foo', 'bar'];
      serviceMock.getData.and.returnValue($q.when(response));       
      $scope.doSearch('810');
      $timeout.flush();

      expect($scope.data).toEqual(response);
      expect($scope.noresults).toBeFalsy();
    });
    
  });


  // describe('Autocomplete', function() {

  //   it('should trigger when the search string changes', function() {});
  //   it('should invoke the search for strings over 2 characters', function() {});
  //   it('should not invoke the search for strings under 3 characters', function() {});
  //   it('should set the no-results flag on initial page load', function() {});
  //   it('should set the no-results flag for strings under 3 characters', function() {});
  //   it('should not clear the no-results flag for strings over 2 characters', function() {});

  // });

  // describe('Dequeuing a record', function() {

  //   it('should call the server with the record id to dequeue', function() {});
  //   it('should set the record loading flag while waiting for a response', function() {});
  //   it('should clear the record loading flag while waiting for a response', function() {});
  //   it('should update the model with the record data returned from the server', function() {});
  //   it('should set an error on the model if the server returns an error code', function() {});

  // });

});
