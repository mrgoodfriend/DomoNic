angular.module('starter.controllers', [])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])

.factory('svc', function () {
    var msg="original...";
    return {
        domojson: function(x,$http) {
            var url = 'http://192.168.0.99:9090';
			var xsrf=({'jsonrpc': '2.0', 'method': x, 'id': 1});
			$http.post($scope.params.server, xsrf    
				)
				.success(function(data, status, headers, config) {
					// what do I do here?
					
			 //console.log(data);
			 $result = angular.fromJson(data).result;
			   



				})
				.error(function(data, status, headers, config) {
					$scope.error = true;
					 $scope.tasks = [
				{ title: headers }
				];
				 console.log('ici7'+data+status +config+headers);
				});
				return result
        },
        getMessage: function() {
            return msg;
        }
    };
})




.controller('AppCtrl', function($scope, $ionicModal, $timeout, $localstorage) {
  //Load data from local storage
  $scope.params={};
  $scope.params.server = $localstorage.get('server');
  $scope.params.username= $localstorage.get('username');
  $scope.params.password = $localstorage.get('password');
  $scope.params.debug = $localstorage.get('debug');
  $scope.cb_debug = $localstorage.get('debug');
  
  // Form data for the login modal
  //$scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/params.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeParams = function() {
  
	$scope.params.server = $localstorage.get('server');
	$scope.params.username= $localstorage.get('username');
	$scope.params.password = $localstorage.get('password');
	$scope.params.debug = $localstorage.get('debug');
	$scope.cb_debug = $localstorage.get('debug');
	
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.openParams = function() {
	//$scope.loginData.server = $localstorage.get('server');
	//$scope.loginData.username= $localstorage.get('username');
	//$scope.loginData.password = $localstorage.get('password');
    $scope.modal.show();
	
  };

  // Perform the login action when the user submits the login form
  $scope.doSave = function() {
  console.log('Save parameters', $scope.params);
    $localstorage.set('server', $scope.params.server);
	$localstorage.set('username', $scope.params.username);
	$localstorage.set('password', $scope.params.password);
	//$scope.params.debug = $scope.cb_debug;
	//$localstorage.set('debug', $scope.params.debug);
	$localstorage.set('debug', $scope.cb_debug);
    console.log('Save parameters', $scope.params.cb_debug);
	

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.modal.hide();
    }, 100);
  };
  
  $scope.change_debug = function(value) {
		console.log('change' + 'valuer'+value);
		if(value==true){
		$scope.params.debug = false;
		}else{
		$scope.params.debug = true;
		}
		};
})


.controller('HomeCtrl',function($scope,$http,$window) {
 
	$scope.doRefresh = function() {
    console.log("refreshing");
	//main();
	//$state.go($state.current, {}, {reload: true});
	$window.location.reload(true);
	//$state.reload();
    $scope.$broadcast('scroll.refreshComplete');
  };
  
  
  var xsrf=({'jsonrpc': '2.0', 'method': 'location.list', 'id': 1});
	$http.post($scope.params.server, xsrf )
		.success(function(data, status, headers, config) {
			
			
			$result = angular.fromJson(data).result;
			console.log($result);
			$scope.tabs = $result;
			//$scope.debug=true;
			})
		.error(function(data, status, headers, config) {
					$scope.error = true;
					 $scope.tasks = [
				{ title: headers }
				];
				 console.log('ici 2'+data+status +config+headers);
				});
  
  
  
	
})

.controller('DevicesCtrl', function($scope,$http) {
 
	var xsrf=({'jsonrpc': '2.0', 'method': 'domotiga.version', 'id': 1});
	$http.post($scope.params.server, xsrf )
		.success(function(data, status, headers, config) {
			
			//console.log($result);
			$result = angular.fromJson(data).result;
			$scope.titre = $result;
			})
		.error(function(data, status, headers, config) {
					$scope.error = true;
					 $scope.tasks = [
				{ title: headers }
				];
				 console.log('ici3'+data+status +config+headers);
				});
				
	var xsrf=({'jsonrpc': '2.0', 'method': 'device.list', 'id': 1});
	$http.post($scope.params.server, xsrf )
		.success(function(data, status, headers, config) {
			
			
			$result = angular.fromJson(data).result;
			console.log($result);
			$scope.devices = $result;
			//$scope.debug=true;
			})
		.error(function(data, status, headers, config) {
					$scope.error = true;
					 $scope.tasks = [
				{ title: headers }
				];
				 console.log('ici 2'+data+status +config+headers);
				});
	
})

.controller('SwitchablesCtrl', function($scope,$http,$filter) {
 
 
	main = function() {
	
	var xsrf=({'jsonrpc': '2.0', 'method': 'device.list', 'id': 1});
	$http.post($scope.params.server, xsrf )
		.success(function(data, status, headers, config) {
			
			
			$result = angular.fromJson(data).result;
			console.log($result);
			//$scope.devices = $result;
			//$scope.debug=false;
			$scope.devices = $filter('filter')($result, { switchable: 'true'})
			$scope.devices.forEach(function(element,index) {
			console.log('device_id : '+element.device_id+' | value : '+element.values[0].value);
			if (element.values[0].value == 'On') {
			
			element.checked = true;
			}
			else
			{
			element.checked = false;
			}
			});
			
			
			})
		.error(function(data, status, headers, config) {
					$scope.error = true;
					 $scope.tasks = [
				{ title: headers }
				];
				 console.log('ici1'+data+status +config+headers);
				});
		}	;	
		$scope.change = function(id,value) {
		console.log('change | device_id : ' + id + ' | value : ');
		console.log('change | device_id : ' + id + ' | value : '+value);
		if(value==true){
		action = 'On';
		}else{
		action = 'Off';
		}
        var xsrf=({'jsonrpc': '2.0', 'method': 'device.set', 'params':{"device_id": id, "valuenum": 1, "value": action}, 'id': 1});
		$http.post($scope.params.server, xsrf )
			.success(function(data, status, headers, config) {
				
				//console.log($result);
				//$result = angular.fromJson(data).result;
				//$scope.devices = $result;
				// if(value=true){
				// $scope.devices.device;
				// }else{
				// value = true;
				// }
				main();
				})
			.error(function(data, status, headers, config) {
						$scope.error = true;
						 $scope.tasks = [
					{ title: headers }
					];
					 console.log('ici15'+data+status +config+headers);
					});
		};	
	
		$scope.doRefresh = function() {
    console.log("refreshing");
	main();
    $scope.$broadcast('scroll.refreshComplete');
  };
      main();		
	
})

.controller('ThermostatCtrl', function($scope,$http,$filter) {
 //var url = 'http://192.168.0.99:9090';
 $result="";
	var sid ="";
	main = function() {
		
		
	var xsrf=({'jsonrpc': '2.0', 'method': 'location.list', 'params':{},'id': 1});
	
	$http.post($scope.params.server, xsrf )
		.success(function(data, status, headers, config) {
			
			//console.log($result);
			$result = angular.fromJson(data).result;
			//$scope.debug = false;
			console.log("Astro : ", data.result);
			
				
			})
		.error(function(data, status, headers, config) {
					$scope.error = true;
					 $scope.tasks = [
				{ title: headers }
				];
				 console.log('ici14'+data+status +config+headers);
				});	
	//	
	var xsrf=({'jsonrpc': '2.0', 'method': 'thermostat.getscenario', 'params':{},'id': 1});
	
	$http.post($scope.params.server, xsrf )
		.success(function(data, status, headers, config) {
			
			//console.log($result);
			$result = angular.fromJson(data).result;
			//$scope.debug = false;
			$scope.scenario = data;
			$scope.plus="plus";
			$scope.minus="-";
			
				
			})
		.error(function(data, status, headers, config) {
					$scope.error = true;
					 $scope.tasks = [
				{ title: headers }
				];
				 console.log('ici14'+data+status +config+headers);
				});
		var xsrf=({'jsonrpc': '2.0', 'method': 'thermostat.listscenario', 'params':{},'id': 1});
	
	$http.post($scope.params.server, xsrf )
		.success(function(data, status, headers, config) {
			
			//console.log($result);
			$result = angular.fromJson(data).result;
			//$scope.debug = false;
			$scope.scenarii = data;
			//$scope.selectedScenario = $scope.scenarii.result[0].name;
			$scope.selectedScenario = $scope.scenario.result.scenario_name;
			console.log('scenario : '+$scope.selectedScenario);		
			
			
			console.log('ii',data);			
			})
		.error(function(data, status, headers, config) {
					$scope.error = true;
					 $scope.tasks = [
				{ title: headers }
				];
				 console.log('ici13'+data+status +config+headers);
				});
				
		
		}	;	
	$scope.change = function(op) {
		console.log('temp' + $scope.scenario.result.scenario_id + ':'+$scope.scenario.result.heating_id+':'+op);
		
		
        var xsrf=({'jsonrpc': '2.0', 'method': 'thermostat.derogateheating', 'params':{"scenario_id": $scope.scenario.result.scenario_id, "heating_id": $scope.scenario.result.heating_id, "operator": op}, 'id': 1});
		$http.post($scope.params.server, xsrf )
			.success(function(data, status, headers, config) {
				
				//console.log($result);
				//$result = angular.fromJson(data).result;
				//$scope.devices = $result;
				// if(value=true){
				// $scope.devices.device;
				// }else{
				// value = true;
				// }
				main();
				})
			.error(function(data, status, headers, config) {
						$scope.error = true;
						 $scope.tasks = [
					{ title: headers }
					];
					 console.log('ici12'+data+status +config+headers);
					});
	};	
		
	$scope.setScenario = function(scenario) {
		console.log('scenario : ' + scenario + "test : " + $scope.selectedScenario);
		
		
        var xsrf=({'jsonrpc': '2.0', 'method': 'thermostat.setscenario', 'params':{"scenario_name": scenario}, 'id': 1});
		$http.post($scope.params.server, xsrf )
			.success(function(data, status, headers, config) {
				
				//console.log($result);
				//$result = angular.fromJson(data).result;
				//$scope.devices = $result;
				// if(value=true){
				// $scope.devices.device;
				// }else{
				// value = true;
				// }
				main()
				})
			.error(function(data, status, headers, config) {
						$scope.error = true;
						 $scope.tasks = [
					{ title: headers }
					];
					 console.log('erreur set scenario'+data+status +config+headers);
					});
		
		console.log('scenario : ' + scenario + "test : " + $scope.selectedScenario);
	};	
		
	$scope.doRefresh = function() {
    console.log("refreshing");
	main();
    $scope.$broadcast('scroll.refreshComplete');
  };
	
		
		
      main();		
	  
	
})


.controller('MethodsCtrl', function($scope,$http) {
 //var url = 'http://192.168.0.99:9090';
	var xsrf=({'jsonrpc': '2.0', 'method': 'domotiga.version', 'id': 1});
	$http.post($scope.params.server, xsrf )
		.success(function(data, status, headers, config) {
			
			//console.log($result);
			$result = angular.fromJson(data).result;
			$scope.titre = $result;
			})
		.error(function(data, status, headers, config) {
					$scope.error = true;
					 $scope.tasks = [
				{ title: headers }
				];
				 console.log('ici10'+data+status +config+headers);
				});
				
	var xsrf=({'jsonrpc': '2.0', 'method': 'system.listMethods', 'id': 1});
	$http.post($scope.params.server, xsrf )
		.success(function(data, status, headers, config) {
			
			//console.log($result);
			$result = angular.fromJson(data).result;
			$scope.methods = $result;
			})
		.error(function(data, status, headers, config) {
					$scope.error = true;
					 $scope.tasks = [
				{ title: headers }
				];
				 console.log('ici11'+data+status +config+headers);
				});
	
})


		
		
   

.controller('EventsCtrl', function($scope,$http) {
	var url = $scope.params.server;
	var xsrf=({'jsonrpc': '2.0', 'method': 'data.newmessage', 'id': 1});
	$http.post(url, xsrf )
		.success(function(data, status, headers, config) {
			$result = angular.fromJson(data).result;
			$scope.titre = $result;
			})
		.error(function(data, status, headers, config) {
					$scope.error = true;
					 $scope.tasks = [
				{ title: headers }
				];
				 console.log('ici8'+data+status +config+headers);
				});
				
	var xsrf=({'jsonrpc': '2.0', 'method': 'event.list', 'id': 1});
	$http.post(url, xsrf )
		.success(function(data, status, headers, config) {
			$result = angular.fromJson(data).result;
			$scope.events = $result;
			console.log("methode result"+$result);
			})
		.error(function(data, status, headers, config) {
					$scope.error = true;
					 $scope.tasks = [
				{ title: headers }
				];
				 console.log('ici9'+data+status +config+headers);
				});
	
})   
.controller('ServerCtrl',function($scope,$http) {
    $result="";
	
	var xsrf=({'jsonrpc': '2.0', 'method': 'domotiga.version', 'id': 1});
	$http.post($scope.params.server, xsrf )
		.success(function(data, status, headers, config) {
			
			console.log("version réussie : "+$result);
			$result = angular.fromJson(data).result;
			console.log("version : " + $result);
			$scope.version = $result;
			})
		.error(function(data, status, headers, config) {
					$scope.error = true;
					 $scope.tasks = [
				{ title: headers }
				];
				 console.log('ici6'+' data :'+data+' status :'+status +' config :'+config+' headers :'+headers);
				});
	
	var xsrf=({'jsonrpc': '2.0', 'method': 'system.hostname', 'id': 1});
	$http.post($scope.params.server, xsrf )
		.success(function(data, status, headers, config) {
			
			//console.log($result);
			$result = angular.fromJson(data).result;
			console.log("hostname : "+$result);
			$scope.hostname = $result;
			})
		.error(function(data, status, headers, config) {
					$scope.error = true;
					 $scope.tasks = [
				{ title: headers }
				];
				 console.log('ici5'+data+status +config+headers);
				});
	var xsrf=({'jsonrpc': '2.0', 'method': 'system.get','params':{"command": "ipaddress"}, 'id': 1});
	$http.post($scope.params.server, xsrf )
		.success(function(data, status, headers, config) {
			
			
			$result = angular.fromJson(data).result;
			console.log("ipadress : "+$result);
			$scope.ipaddress = $result[0];
			})
		.error(function(data, status, headers, config) {
					$scope.error = true;
					 $scope.tasks = [
				{ title: headers }
				];
				 console.log('ici4'+data+status +config+headers);
				});
				
	var xsrf=({'jsonrpc': '2.0', 'method': 'domotiga.uptime', 'id': 1});
	$http.post($scope.params.server, xsrf )
		.success(function(data, status, headers, config) {
			
			
			$result = angular.fromJson(data).result;
			console.log("uptime: "+$result);
			$scope.uptime = $result;
			})
		.error(function(data, status, headers, config) {
					$scope.error = true;
					 $scope.tasks = [
				{ title: headers }
				];
				 console.log('echec uptime'+data+status +config+headers);
				});
				

	
	
 
})


.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.directive('showWhen', ['$window', function($window) {


 return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

  function checkExpose() {
    var mq = $attr.showWhen == 'large' ? '(min-width:768px)' : $attr.showWhen;
    if($window.matchMedia(mq).matches){
		$element.removeClass('ng-hide');
	} else {
		$element.addClass('ng-hide');		
	}
  }

  function onResize() {
    debouncedCheck();
  }

  var debouncedCheck = ionic.debounce(function() {
    $scope.$apply(function(){
      checkExpose();
    });
  }, 300, false);

  checkExpose();

  ionic.on('resize', onResize, $window);

  $scope.$on('$destroy', function(){
    ionic.off('resize', onResize, $window);
  });

}
  };
}])
;
