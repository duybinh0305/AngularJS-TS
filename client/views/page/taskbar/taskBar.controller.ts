module app{
    'use strict';

    @Controller('TaskBarController')
    export class TaskBarCtrl{

        function($scope: { test: string; }) {
            $scope.test="ne";
        }
    }
}