function(metho,$http){
var url = 'http192.168.0.99:9090';
var xsrf=({'jsonrpc': '2.0', 'method': metho, 'id': 1});
$http.post('http://192.168.0.99/test/', xsrf    
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
	 console.log('ici'+data+status +config+headers);
    });






return result;
}]);



.value('CommonCode', function ($window,$http,) {
        var root = {};
        root.json = function(method){
			console.log('je suis entré dans la focntion');
            var xsrf=({'jsonrpc': '2.0', 'method': method, 'id': 1});
			$http.post('http://192.168.0.99/test/', xsrf )
				.success(function(data, status, headers, config) {
			
			
				$result = angular.fromJson(data).result;
				console.log('resultat focntion'+$result);
				root.result = $result;
					})
				.error(function(data, status, headers, config) {
							$scope.error = true;
							 $scope.tasks = [
						{ title: headers }
						];
						 console.log('ici'+data+status +config+headers);
						});
        };
        return root;