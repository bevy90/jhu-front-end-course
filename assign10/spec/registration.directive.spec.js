describe('registration directive', function() {
	var $compile;
	var $scope;
	var $httpBackend;
	var form;
	var expectedHtml = 'No such menu number exists';
	var element;

	beforeEach(module('restaurant', 'public'));

	beforeEach(inject(function(_$compile_, $injector) {
		$compile = _$compile_;
		$scope = $injector.get('$rootScope').$new();
		$httpBackend = $injector.get('$httpBackend');
		var shortNames = ["A1", "A2", "A3", "A4", "B1", "B2", "C1", "C2", "D1", "D2", "F1", "F3", "VG1", "VG4", "VG7"];
		var reg = {};
		reg.shortNames = shortNames;		
		$httpBackend.whenGET('https://jbaptiste-course5.herokuapp.com/menu_items.json').respond(shortNames);
		$httpBackend.whenGET('src/public/public.html').respond('<ui-view></ui-view>');
		$httpBackend.whenGET('src/public/home/home.html').respond('<div></div>');
		
		var user = {};
		user.favDish = "";
		$scope.user = user;
		$scope.reg = reg;
		element = $compile('<form name="myForm" novalidate>' +
				'<input type="text" name="favDish" ng-model="user.favDish" required shortname>' +
				'<span class="warning" ng-if="(myForm.favDish.$error.required || myForm.favDish.$error.shortname) ' +
				'&& myForm.favDish.$touched"> No such menu number exists </span> </form>')($scope);
		form = $scope.myForm;
	}));

	it('should show error message when favorite dish does not exist', function() {
		form.favDish.$setViewValue('s');		
		form.favDish.$touched = true;
		$scope.$digest();
		expect(form.favDish.$touched).toBe(true);
		expect(form.favDish.$valid).toBe(false);
		expect(element.html()).toContain(expectedHtml);
		$httpBackend.flush();
	});

	it('should not show error message when favorite dish exists', function() {
		form.favDish.$setViewValue('A1');
		form.favDish.$touched = true;
		$scope.$digest();
		expect(form.favDish.$touched).toBe(true);
		expect(form.favDish.$valid).toBe(true);
		expect(element.html()).not.toContain(expectedHtml);
		$httpBackend.flush();
	});

	it('should not show error message when favorite dish field has not been touched', function() {
		$scope.$digest();
		expect(form.favDish.$touched).toBe(false);
		expect(element.html()).not.toContain(expectedHtml);
		$httpBackend.flush();
	});

	it('should show error message when no favorite dish is entered', function() {
		form.favDish.$touched = true;
		$scope.$digest();
		expect(form.favDish.$touched).toBe(true);
		expect(form.favDish.$valid).toBe(false);
		expect(element.html()).toContain(expectedHtml);
		$httpBackend.flush();
	});

});