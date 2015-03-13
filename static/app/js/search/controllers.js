/* Controllers */

var ecSearchControllers = angular.module('ecSearchControllers', ['restangular']);


ecSearchControllers.controller('searchCtrl', 
  ['$scope', 'Restangular', '$q',
  function($scope, Restangular, $q) {

    $scope.onChange = function() {
      if ($scope.searchString.length > 2) {
        console.log("call REST " + $scope.searchString);
      };
    };

    $scope.data = [
      { 'serial_number': '12345678',
        'status': 'Completed',
        'call_type': 'My Little Pony',
        'nameprefix': 'Ms.',
        'firstname': "Ann",
        'middlename': "B G",
        'lastname': "Hathaway",
        'suffix': ".jr",
        'tel': {
          'tel_work': "022 555 1234",
          'tel_evening': "",
          'tel_mobile': "022 555 5678",
          'tel_home': "022 555 7890",
        },
        'address': {
          'addr1': "62 Margie Viaduct Apt. 808",
          'addr2': "",
          'addr3': "",
          'suburb': "Smithamport",
          'city': "Mrazchester",
          'postcode': "",
        },
      },
      { 'serial_number': '12345678',
        'status': 'New',
        'call_type': 'My Little Pony',
        'nameprefix': 'Ms.',
        'firstname': "Ann",
        'middlename': "B G",
        'lastname': "Hathaway",
        'suffix': ".jr",
        'tel': {
          'tel_work': "022 555 1234",
          'tel_evening': "",
          'tel_mobile': "022 555 5678",
          'tel_home': "022 555 7890",
        },
        'address': {
          'addr1': "62 Margie Viaduct Apt. 808",
          'addr2': "",
          'addr3': "",
          'suburb': "Smithamport",
          'city': "Mrazchester",
          'postcode': "",
        },
      },
      { 'serial_number': '12345678',
        'status': 'Completed',
        'call_type': 'My Little Pony',
        'nameprefix': 'Ms.',
        'firstname': "Ann",
        'middlename': "B G",
        'lastname': "Hathaway",
        'suffix': ".jr",
        'tel': {
          'tel_work': "022 555 1234",
          'tel_evening': "",
          'tel_mobile': "022 555 5678",
          'tel_home': "022 555 7890",
        },
        'address': {
          'addr1': "62 Margie Viaduct Apt. 808",
          'addr2': "",
          'addr3': "",
          'suburb': "Smithamport",
          'city': "Mrazchester",
          'postcode': "",
        },
      },
      { 'serial_number': '12345678',
        'status': 'New',
        'call_type': 'My Little Pony',
        'nameprefix': 'Ms.',
        'firstname': "Ann",
        'middlename': "B G",
        'lastname': "Hathaway",
        'suffix': ".jr",
        'tel': {
          'tel_work': "022 555 1234",
          'tel_evening': "",
          'tel_mobile': "022 555 5678",
          'tel_home': "022 555 7890",
        },
        'address': {
          'addr1': "62 Margie Viaduct Apt. 808",
          'addr2': "",
          'addr3': "",
          'suburb': "Smithamport",
          'city': "Mrazchester",
          'postcode': "",
        },
      },
    ];

  }]);