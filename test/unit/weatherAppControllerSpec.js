/**
 * Created by Mikhail on 2/12/2016.
 */
describe('Testing appController', function(){
    var $controller;

    beforeEach(function(){
        module('weather');

        inject(function(_$controller_){
            $controller = _$controller_;
        });
    });

    it('should check isNavHidden scope property is changed', function(){
        var $scope = {};
        var controller = $controller('appController', { $scope: $scope });
        $scope.isNavHidden = false;
        $scope.toggleNav();
        expect($scope.isNavHidden).toEqual(true);
    });

});


