<form ng-submit="main.setMap(main.address1, main.address2)">
    <label name="address1">Address 1:</label>
    <input type="text"
            name="address1"
            ng-model="main.address1"
            ng-blur="main.getProducts(main.address1)">
    <button class="button"
            type="submit"
            name="submit">Submit</button>
</form>

<div class="price-estimates"
    ng-repeat="price in main.priceEstimates track by $index">
    <span class="product-name">
        {{ price.display_name }}
    </span>
    <span class="product-price">
        {{ price.estimate }}
    </span>
    <span class="product-trip-duration">
        {{ price.duration | secondsToMinutes }} min
    </span>
</div>
<div class="estimates" ng-repeat="time in main.timeEstimates track by $index">
    <span class="product-name">
        {{ time.display_name }}
    </span>
    <span class="product-time">
        {{ time.estimate | secondsToMinutes }} min
    </span>
</div>