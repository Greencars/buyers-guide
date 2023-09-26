
/* -----------------------*/
/* --------GLOBAL--------*/
/* -----------------------*/
var isDebug = false;
var eventTriggered = 0;
var currentSeletedCar = {};

const onChangeElement = (qSelector, cb) => {
  let funcId = 'onChangeElement_Observer';
  stopwatchStart(funcId);

  const targetNode = document.querySelector(qSelector);
  if (targetNode) {
    const config = {
      attributes: false,
      childList: true,
      subtree: false,
      characterData: true,
    };
    const callback = function (mutationsList, observer) {
      cb($(qSelector));
    };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
  } else {
    console.error('onChangeElement: Invalid Selector');
  }

  stopwatchEnd(funcId);
};

/* -----------------------*/
/* --------METHODS--------*/
/* -----------------------*/

function getCarName(e) {
  return `${$('[fs-cmsfilter-field="year"]', e).html()} ${$(
    '[fs-cmsfilter-field="brand"]',
    e
  ).html()} / ${$('.cars-tab-vehicle--model-span', e).html()}`;
}

function drawCarName(data) {
  let html = '';
  data.map((e) => {
    html += `<div>${e.name}</div>`;
  });
  return html;
}

function drawCarHeader(data) {
  let html = '';
  data.map((e) => {
    html += `<div class="car-name-wrapper">
                <div class="car-image-labels">
                    <div class=""><img src="${e.image}" loading="lazy" alt="" class="car-image"> 
                    </div>
                    <div class="car-name-labels">
                        <div class="car-label-content">${e.name}</div>
                        <div class="car-span-content">${e.model}</div>
                    </div>
                </div>
            </div>`;
  });
  return html;
}

function drawCarFuel(data) {
  let html = '';

  data.map((e) => {
    let fuel = e.fuelType;
    let icon = () => {
      if (fuel === 'Plug-in Hybrid') {
        return 'https://assets-global.website-files.com/6238640c74e61b4d447f965f/6239ecfe02679538217e7b8c_plugin.svg';
      } else if (fuel === 'Battery Electric') {
        return 'https://assets-global.website-files.com/6238640c74e61b4d447f965f/6238ffb8822246636b7dfab9_electric.svg';
      } else {
        return 'https://assets-global.website-files.com/6238640c74e61b4d447f965f/624c8c83dbb778511f4e433d_GreenCars_Icons_Categories_simplified_hybrid.svg';
      }
    };
    html += `<div class="cars-tab-single-tab-flex-container">
                    <img src="${icon()}" loading="lazy" alt="" class="plugin-icon">
                    <div class="cars-tab-type--label">${fuel}</div>
                </div>`;
  });
  return html;
}

function drawCarSeats(data) {
  let html = '';
  data.map((e) => {
    html += `<div class="value">${e.seats}</div>`;
  });
  return html;
}

function drawEstPrice(data) {
  let html = '';
  data.map((e) => {
    html += `<div class="value">${formatter.format(e.estPrice)}</div>`;
  });
  return html;
}

function drawIncentives(data) {
  let html = '';
  data.map((e) => {
    html += `<div class="value"><a href="https://tools.greencars.com/incentives" target="_blank" class="details-category-link">View</a></div>`;
  });
  return html;
}

function drawFederalTax(data) {
  let html = '';
  data.map((e) => {
    html += `<div class="value"><a href="${e.federalUrl}" target="_blank" class="details-category-link">Yes</a></div>`;
  });
  return html;
}

function drawEstPayment(data) {
  let html = '';
  data.map((e) => {
    html += `<div class="value">${formatter.format(e.estPayment)} /mo</div>`;
  });
  return html;
}

function drawCarMpg(data) {
  let html = '';
  data.map((e) => {
    html += `<div class="value">${e.mpg}</div>`;
  });
  return html;
}

function drawElectricRange(data) {
  let html = '';
  data.map((e) => {
    html += `<div class="value">${e.electricRange} miles</div>`;
  });
  return html;
}

function drawCarDriveType(data) {
  let html = '';
  data.map((e) => {
    if (!e.driveType) {
      html += `<div class="value">n/a</div>`;
    }
    html += `<div class="value">${e.driveType}</div>`;
  });
  return html;
}

function drawCarBodyType(data) {
  let html = '';
  data.map((e) => {
    html += `<div class="value">${e.bodyType}</div>`;
  });
  return html;
}

function drawCarGreenScore(data) {
  let html = '';
  data.map((e) => {
    html += `<div class="green-score-label-box">
                    <div class="gs-label">${e.name}</div>
                    <div class="value-special">${e.greenScore} out of 5</div>
                </div>`;
  });
  return html;
}

function drawTotalRange(data) {
  let html = '';
  data.map((e) => {
    html += `<div class="value">${e.totalRange} miles</div>`;
  });
  return html;
}

function drawCarSpeed(data) {
  let html = '';
  data.map((e) => {
    if (e.speed == 0.0) {
      return (html += `<div class="value">n/a</div>`);
    }

    html += `<div class="value">${e.speed} seconds</div>`;
  });
  return html;
}

function drawCarBatteryCap(data) {
  let html = '';
  data.map((e) => {
    html += `<div class="value">${e.batteryCap} kWh</div>`;
  });
  return html;
}

function drawCarChargeTime(data) {
  let html = '';
  data.map((e) => {
    html += `<div class="value">${e.chargeTime} hrs</div>`;
  });
  return html;
}

function drawCarChargeTime240(data) {
  let html = '';
  data.map((e) => {
    html += `<div class="value">${e.chargeTime240} hrs</div>`;
  });
  return html;
}

function drawMilesKwh(data) {
  let html = '';
  data.map((e) => {
    html += `<div class="value">${e.milesKwh}</div>`;
  });
  return html;
}

function drawCarPerformanceScore(data) {
  let html = '';
  data.map((e) => {
    html += `  <div class="performance-score-label-box">
                    <div class="perf-label">${e.name}</div>
                    <div class="value-special">${e.performanceScore} out of 5</div>
                </div>`;
  });
  return html;
}

function drawCarMsrp(data) {
  let html = '';
  data.map((e) => {
    html += `<div class="value">${formatter.format(e.baseMsrp)}</div>`;
  });
  return html;
}

function drawCarEnergyCost(data) {
  let html = '';
  data.map((e) => {
    html += `<div class="value">${formatter.format(e.energyCost)}</div>`;
  });
  return html;
}

function drawCostRangeMile(data) {
  let html = '';
  data.map((e) => {
    html += `<div class="value">${formatter.format(e.costRangeMile)}/mo</div>`;
  });
  return html;
}

function drawTotalMonthlyCost(data) {
  let html = '';
  data.map((e) => {
    html += `<div class="value">${formatter.format(e.totalMonthlyCost)}</div>`;
  });
  return html;
}

function drawCarEnergyCostMile(data) {
  let html = '';
  data.map((e) => {
    html += `<div class="value">${formatter.format(e.energyCostMile)} per mile</div>`;
  });
  return html;
}

function drawCarAffordabilityScore(data) {
  let html = '';
  data.map((e) => {
    html += `  <div class="affordability-score-label-box">
                    <div class="perf-label">${e.name}</div>
                    <div class="value-special">${e.affordabilityScore} out of 5</div>
                </div>`;
  });
  return html;
}

function drawCarCo2(data) {
  let html = '';
  data.map((e) => {
    if (e.co2 == 0) {
      return (html += `<div class="value">n/a</div>`);
    }
    html += `<div class="value">${e.co2}</div>`;
  });
  return html;
}

function drawEpaSmogRating(data) {
  let html = '';
  data.map((e) => {
    if (e.epaSmogRating == 0) {
      return (html += `<div class="value">n/a</div>`);
    }
    html += `<div class="value">${e.epaSmogRating}</div>`;
  });
  return html;
}

function drawCarEnvironmentScore(data) {
  let html = '';
  data.map((e) => {
    html += `<div class="environ-score-label-box">
                    <div class="envi-label">${e.name}</div>
                    <div class="value-special">${e.environmentScore} out of 5</div>
                </div>`;
  });
  return html;
}

function drawCarDetailRow(args) {
  console.log("drawcardetailrow");
  let html = '';
  let defaults = { label: '', value: 'n/a', type: '' };

  let props = {
    ...defaults,
    ...args,
  };

  return (html = `<div class="card-details-row ${props.type}">
            <div class="details-category-label">${props.label === '' ? 'n/a' : props.label}</div>
            <div class="details-category-value">${props.value === '' ? 'n/a' : props.value}</div>
        </div>`);
}

function drawGreenScoreBox(score) {
  console.log("GC Score " + score);
  let html = '';
  let green = `<img class="big-leaf" src="https://assets-global.website-files.com/6238640c74e61b4d447f965f/623b23057582ddb7fd18e23e_leaf-green.svg" loading="lazy" alt="">`;
  let grey = `<img class="big-leaf" src="https://assets-global.website-files.com/6238640c74e61b4d447f965f/623b22eeb0db51ba54f37df2_leaf-grey.svg" loading="lazy" alt="">`;
  let half = `<img class="big-leaf" src="https://uploads-ssl.webflow.com/6238640c74e61b4d447f965f/6267b13a96f71371ec3d186d_leaf-half.svg" loading="lazy" alt="">`;
  let s = parseFloat(score);
  let leafs = '';

  if (s === 5) {
    leafs = `${green}${green}${green}${green}${green}`;
  } else if (s >= 4.01 && s <= 4.99) {
    leafs = `${green}${green}${green}${green}${half}`;
  } else if (s === 4) {
    leafs = `${green}${green}${green}${green}${grey}`;
  } else if (s >= 3.01 && s <= 3.99) {
    leafs = `${green}${green}${green}${half}${grey}`;
  } else if (s === 3) {
    leafs = `${green}${green}${green}${grey}${grey}`;
  } else if (s >= 2.01 && s <= 2.99) {
    leafs = `${green}${green}${half}${grey}${grey}`;
  } else if (s === 2) {
    leafs = `${green}${green}${grey}${grey}${grey}`;
  } else if (s >= 1.01 && s <= 1.99) {
    leafs = `${green}${half}${grey}${grey}${grey}`;
  } else if (s === 1) {
    leafs = `${green}${grey}${grey}${grey}${grey}`;
  } else if (s >= 0.01 && s <= 0.99) {
    leafs = `${half}${grey}${grey}${grey}${grey}`;
  } else if (s === 0) {
    leafs = `${grey}${grey}${grey}${grey}${grey}`;
  } else {
    console.log("ended in else");
    html = `n/a`;
    return html;
  }
  console.log(leafs);
  return (html = `<div class="greenscore-score-box">
                        <div class="score-box-icons-wrapper">${leafs}</div>
                        <div class="score-box-value"><div>${score} out of 5</div></div>
                    </div>`);
}

function drawGreenScoreLeafs(score) {
  let html = '';
  let green = `<img class="small-leaf" src="https://assets-global.website-files.com/6238640c74e61b4d447f965f/623b23057582ddb7fd18e23e_leaf-green.svg" loading="lazy" alt="">`;
  let grey = `<img class="small-leaf" src="https://assets-global.website-files.com/6238640c74e61b4d447f965f/623b22eeb0db51ba54f37df2_leaf-grey.svg" loading="lazy" alt="">`;
  let half = `<img class="small-leaf" src="https://uploads-ssl.webflow.com/6238640c74e61b4d447f965f/6267b13a96f71371ec3d186d_leaf-half.svg" loading="lazy" alt="">`;
  let s = parseFloat(score);
  let leafs = '';

  if (s === 5) {
    leafs = `${green}${green}${green}${green}${green}`;
  } else if (s >= 4.01 && s <= 4.99) {
    leafs = `${green}${green}${green}${green}${half}`;
  } else if (s === 4) {
    leafs = `${green}${green}${green}${green}${grey}`;
  } else if (s >= 3.01 && s <= 3.99) {
    leafs = `${green}${green}${green}${half}${grey}`;
  } else if (s === 3) {
    leafs = `${green}${green}${green}${grey}${grey}`;
  } else if (s >= 2.01 && s <= 2.99) {
    leafs = `${green}${green}${half}${grey}${grey}`;
  } else if (s === 2) {
    leafs = `${green}${green}${grey}${grey}${grey}`;
  } else if (s >= 1.01 && s <= 1.99) {
    leafs = `${green}${half}${grey}${grey}${grey}`;
  } else if (s === 1) {
    leafs = `${green}${grey}${grey}${grey}${grey}`;
  } else if (s >= 0.01 && s <= 0.99) {
    leafs = `${half}${grey}${grey}${grey}${grey}`;
  } else if (s === 0) {
    leafs = `${grey}${grey}${grey}${grey}${grey}`;
  } else {
    html = `n/a`;
    return html;
  }

  return (html = `<div class="score-box-icons-wrapper less-padding">${leafs}</div>`);
}

/* -----------------------*/
/* -----MANAGE STATE----*/
/* -----------------------*/
function checkFilterState(i) {
  setTimeout(function () {
    let length = $('#filter-active').children('[fs-cmsfilter-element="tag-template"]').length;
    if (i === 1) {
      length = 0;
    }
    $('#active-filter-label').text(`${length} Filters`);
    if (length < 1) {
      $('#filter-active, #filters-action').css('display', 'none');
    } else {
      $('#filter-active, #filters-action').css('display', 'flex');
    }
  }, 300);
}

function getCarDetailState(e) {
  return $(e).attr('gc-state');
}

function setCarDetailState(e) {
  let state = getCarDetailState(e);

  if (state === 'false') {
    state = 'true';
  } else {
    state = 'false';
  }

  $(e).attr('gc-state', state);
  return;
}

function isMobileWidth(f) {
  console.log('Mobile width checked');
  let state = $('#mobile-indicator').is(':visible');
  return state ? true : f();
}

function openCarDetails(e) {
  console.log("opendetails");
  closeAll();
  currentSeletedCar = {};

  // block scope
  let el = $(e).siblings($('.car-card-details'));
  let id = $(e).find('[fs-cmsfilter-field="vehicle-uvc"]').html();
  let score = $(e).find('[fs-cmsfilter-field="new-green-score"]').html();
  let lineItem = $(el).closest($('.cars-database-collection-item')).html();
  let fuelType = $(e).find('[fs-cmsfilter-field="gc-type"]').html();
  console.log("CarUVC is " + id);
  console.log("CarType is " + fuelType);
  //draw greenbox score
  $('[gc-greenbox="' + id + '"]').empty();
  $('[gc-greenbox="' + id + '"]').append(drawGreenScoreBox(score));
  if ($('[gc-greenbox="' + id + '"]').length > 0){
    console.log($('[gc-greenbox="' + id + '"]').length)
  }
  if (fuelType == 'Hybrid' || fuelType == 'Gas'){
    console.log(fuelType);
    $('[gc-data-variable="battery_capacity"]').hide();
    $('[gc-data-variable="time_to_charge_120"]').hide();
    $('[gc-data-variable="time_to_charge_240"]').hide();
    $('[gc-data-variable="kwh_per_mile"]').hide();
    $('[gc-data-label="fuel_efficiency"]').text("MPG")
  }
  else {
    $('[gc-data-variable="battery_capacity"]').show();
    $('[gc-data-variable="time_to_charge_120"]').show();
    $('[gc-data-variable="time_to_charge_240"]').show();
    $('[gc-data-variable="kwh_per_mile"]').show();
    $('[gc-data-label="fuel_efficiency"]').text("MPGe")
  }

  //make visual changes to ui
  el.css('display', 'flex');
  tram(el).start({
    display: 'flex',
    width: '',
    opacity: 1,
  });
  //$('.car-details-button-wrapper').show();

  //handle global state
  setCarDetailState(e);
  currentSeletedCar = constructDataObj(id, lineItem);
}

function closeCarDetails() {
  //block scope
  let el = $('[gc-state="true"]').siblings($('.car-card-details'));

  //make visual changes to ui
  //$('.car-details-button-wrapper').hide();
  tram(el).start({
    width: 0,
    opacity: 0,
  });
  $('[gc-state="true"]').attr('gc-state', 'false');
}

function closeAll() {
  currentSeletedCar = {};
  closeCarDetails();
}

function collapseDetails() {
  console.log("collapseDetails");
  $('.gc-accordion').addClass('gc-collapse');
  $('.gc-collapse-btn').text('Expand');
  $('.gc-collapse-btn').removeClass('gc-accordion-expanded');
}

function expandDetails() {
  console.log("expandDetails");
  $('.gc-accordion').removeClass('gc-collapse');
  $('.gc-collapse-btn').text('Collapse');
  $('.gc-collapse-btn').addClass('gc-accordion-expanded');
}

function singleTriggerAccordion(e) {
  let el = $(e).siblings($('.gc-accordion'));
  return el.hasClass('gc-collapse') ? el.removeClass('gc-collapse') : el.addClass('gc-collapse');
}

function handelFilterResults() {
  let results = $('[fs-cmsfilter-element="results-count"]').text();
  $('#results-mobile').text(results);
}

/* -----------------------*/
/* -----INIT METHODS----*/
/* -----------------------*/

function initTram() {
  tram($('.car-card-details')).add('opacity 300ms ease').add('width 300ms ease').set({
    width: 0,
    opacity: 0,
  });
}

function initCarSingleTab() {
  $('.cars-tab-single-tab').off('click');
  $('.cars-tab-single-tab').on('click', function (event) {
    if ($(event.target).is('input') || $(event.target).hasClass('w-checkbox-input')) {
      return;
    }

    let el = $(event.target).closest($('.cars-tab-single-tab'));

    let state = getCarDetailState(el);
    if (state === 'true') {
      closeAll();
    } else {
      openCarDetails(el);
    }
  });
}

function initCloseOutside() {
  $(
    'body, .filters-wrapper, .section-header, .w-nav, .w-container, .w-pagination-wrapper, .wf-section, .active-filters-actions, .active-filters-wrapper, .gc-fav-list'
  ).off();
  $(
    'body, .filters-wrapper, .section-header, .w-nav, .w-container, .w-pagination-wrapper, .wf-section, .active-filters-actions, .active-filters-wrapper, .gc-fav-list'
  ).on('click', function (event) {
    if (event.target !== this) {
      return;
    }
    closeAll();
  });
}

function initCloseDetails() {
  $('[gc-event="closeCarDetails"]').off();
  $('[gc-event="closeCarDetails"]').on('click', function () {
    closeCarDetails();
  });
}

function initGreenCars() {
  checkFilterState(1);
  initTram();

  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    'cmsfilter',
    (filterInstances) => {
      // The callback passes a `filterInstances` array with all the `CMSFilters` instances on the page.
      const [filterInstance] = filterInstances;

      // The `renderitems` event runs whenever the list renders items after filtering.
      filterInstance.listInstance.on('renderitems', (renderedItems) => {
        stopwatchStart('observer_fnsweet_render');
        checkFilterState();
        initCarSingleTab();
        initCloseOutside();
        initCloseDetails();
        handelFilterResults();
        $('[gc-event="format"]').each((i, e) => reFormat($(e)));
        $('[gc-event="drawLeafs"]').each((i, e) => replaceGcScore($(e)));
        stopwatchEnd('observer_fnsweet_render');
      });
    },
  ]);
}

/* -----------------------*/
/* --MAIN EVENT HANDLERS--*/
/* -----------------------*/
$(document).ready(function () {
  let funcId = 'DocumentReady';
  stopwatchStart(funcId);
  let viewport_meta = $('meta[name="viewport"]');
  const viewports = {
    default: viewport_meta.attr('content'),
    tablet: 'width=978',
  };
  const viewport_set = () => {
    // console.log('viewport_set');
    if ($(window).width() < 1320 && $(window).width() > 990) {
      viewport_meta.attr('content', viewports.tablet);
      // console.log('Viewport is in true');
    } else {
      viewport_meta.attr('content', viewports.default);
      // console.log('Viewport is in false');
    }
  };

  /* -----------------------*/
  /* -----CALL INIT METHODS----*/
  /* -----------------------*/
  initGreenCars();
  //viewport_set();

  /* -----------------------*/
  /* -----EVENT HANDLERS----*/
  /* -----------------------*/

  $('.gc-close-dropdown').on('click', function () {
    $(this).closest($('.w-dropdown')).trigger('w-close');
    $('#comparing-bar').css('z-index', '10');
  });

  $('#gc-mobile-filter').on('click', function () {
    $('#comparing-bar').css('z-index', '0');
  });

  $(window).resize(function () {
    // viewport_set();
  });

  stopwatchEnd(funcId);
});

/* -----------------------*/
/* -----HELPERS----*/
/* -----------------------*/

function constructDataObj(id, e) {
  let lineItem = $(e);
  return {
    id: id,
    name: getCarName(lineItem),
    model: $('.cars-tab-vehicle--model-span', lineItem).html(),
    image: $('.car-image', lineItem).attr('src'),
    fuelType: $('[fs-cmsfilter-field="gc-type"]', lineItem).html(),
    seats: $('[fs-cmsfilter-field="seats"]', lineItem).html(),
    driveType: $('[fs-cmsfilter-field="drive"]', lineItem).html(),
    bodyType: $('[fs-cmsfilter-field="body"]', lineItem).html(),
    greenScore: $('[fs-cmsfilter-field="new-green-score"]', lineItem).html(),
    electricRange: $('[fs-cmsfilter-field="electric-range"]', lineItem).html(),
    totalRange: $('[fs-cmsfilter-field="total-range"]', lineItem).html(),
    mpg: $('[fs-cmsfilter-field="mpg"]', lineItem).html(),
    speed: $('[fs-cmsfilter-field="speed"]', lineItem).html(),
    batteryCap: $('[fs-cmsfilter-field="battery"]', lineItem).html(),
    chargeTime: $('[fs-cmsfilter-field="time-to-charge"]', lineItem).html(),
    chargeTime240: $('[fs-cmsfilter-field="time-charge-240"]', lineItem).html(),
    milesKwh: $('[fs-cmsfilter-field="miles-per-kwh"]', lineItem).html(),
    performanceScore: $('[fs-cmsfilter-field="performance-score"]', lineItem).html(),
    baseMsrp: $('[fs-cmsfilter-field="base-msrp"]', lineItem).html(),
    totalMonthlyCost: $('[fs-cmsfilter-field="total-monthly-cost"]', lineItem).html(),
    energyCost: $('[fs-cmsfilter-field="mon-energy-cost"]', lineItem).html(),
    energyCostMile: $('[fs-cmsfilter-field="energy-cost-mile"]', lineItem).html(),
    affordabilityScore: $('[fs-cmsfilter-field="affordability-score"]', lineItem).html(),
    co2: $('[fs-cmsfilter-field="co2"]', lineItem).html(),
    environmentScore: $('[fs-cmsfilter-field="environment-score"]', lineItem).html(),
    epaSmogRating: $('[fs-cmsfilter-field="epa-smog-rating"]', lineItem).html(),
    fuelCost: $('[fs-cmsfilter-field="fuel-cost"]', lineItem).html(),
    youSaveSpend: $('[fs-cmsfilter-field="you-save-spend"]', lineItem).html(),
    shopDriveway: $('[fs-cmsfilter-field="shop-driveway"]', lineItem).html(),
    estPrice: $('[fs-cmsfilter-field="est-price"]', lineItem).html(),
    estPayment: $('[fs-cmsfilter-field="est-payment"]', lineItem).html(),
    costRangeMile: $('[fs-cmsfilter-field="cost-mile-range"]', lineItem).html(),
    federalUrl: $('[fs-cmsfilter-field="federal-url"]', lineItem).html(),
    preOrderUrl: $('[fs-cmsfilter-field="pre-order_url"]', lineItem).html(),
  };
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});

const reFormat = (e) => {
  let formatted = formatter.format(e.text());
  $(e).text(formatted).attr('gc-event', 'formatted');
};

const replaceGcScore = (e) => {
  let score = $(e).text();
  let leafs = drawGreenScoreLeafs(score);
  $(e).after(leafs);
  $(e).attr('gc-event', 'score-replaced');
};

// Debugging
function stopwatchStart(funcName) {
  if (isDebug) console.time(funcName);
}

function stopwatchEnd(funcName) {
  if (isDebug) console.timeEnd(funcName);
}