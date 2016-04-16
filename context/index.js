var flattenObject2 = function(obj) {
    var result = {},
        flatObject;
    Object.keys(obj).forEach(function(i) {
        if ((typeof obj[i]) === 'object' && !Array.isArray(obj[i]) && obj[i] !== null && obj[i] !== undefined) {
            flatObject = flattenObject2(obj[i]);
            Object.keys(flatObject).forEach(function(x) {
                result[i + (!!isNaN(x) ? '.' + x : '')] = flatObject[x];
            });
        } else {
            result[i] = obj[i];
        }
    });
    return result;
};

var flattenObject = function(object, nameSpace, flattendList) {
    // console.log(' object to flatten: ', object, '. Namespace: ', nameSpace);
    if (!object) {
        return flattendList;
    }

    if (object instanceof Array) {
        // console.log('object: ', object, ' is an array');
        for (var i = 0; i < object.length; i++) {
            flattenObject(object[i], nameSpace, flattendList);
        }
    } else if (object instanceof Object) {
        for (var obj in object) {

            var newNameSpace = nameSpace + '.' + obj;
            // flattendList.push(newNameSpace);

            flattenObject(object[obj], newNameSpace, flattendList);
        }
    } else {
        // console.log('object: ', object, ' is a leaf node');
        flattendList.push(nameSpace + '.' + object);
    }

    return flattendList;
};

var testObject = {
    key1: {
        subkey: "value"
    },
    key2: ['array1', 'array2'],
    key3: 'value3'
};

// var flattendList = flattenObject(testObject, "test", []);
// var flattendList = flattenObject2(testObject);
// console.log('flattend list: ', flattendList);

var getContextForConfig = function(allConfig) {

    var parsedJson = JSON.parse(allConfig);
    var app = 'app';
    var ycbJson = parsedJson.app;
    console.log('ycbJson : ', ycbJson);
    var configToContextMap = {};

    // for (var i = 0; i < ycbJson.length; i++) {
    for (var o in ycbJson) {
        var config = ycbJson[o];
        var settings = config.settings;
        var context;
        /* settings specify the context */
        if (settings) {
            context = settings.join(',');
        } else {
            context = 'master';
        }
        console.log('context=> ', context);
        /* iterate through the remaining configs and add current context for config name*/
        for (var obj in config) {
            if (obj === 'settings') {
                continue;
            }
            // /* only flatten if current element is an object, else add object and context pair to configContextMap */
            // if (!(config[obj] instanceof Object)) {
            //     if (configToContextMap[obj]) {
            //         configToContextMap[obj].push(context);
            //     } else {
            //         configToContextMap[obj] = [context];
            //     }
            //     continue;
            // }

            console.log('config is an object: ', config[obj]);

            /* flatten the current JSON object */
            var flattenedObject = flattenObject(config[obj], obj, []);

            // var flattenedObject = flattenObject2(config[obj]);
            console.log('flattend list: ', flattenedObject);

            /* for flattend list, create new array with context if current config name has not been process, 
                append to existing array
            */
            for(var j = 0; j < flattenedObject.length; j++) {

                if(configToContextMap[flattenedObject[j]]) {
                     configToContextMap[flattenedObject[j]].push(context);
                } else {
                 configToContextMap[flattenedObject[j]] = [context];

                }
            }

            // for (var obj2 in flattenedObject) {

            //     if (configToContextMap[obj2]) {
            //         configToContextMap[obj2].push(context);
            //     } else {
            //         configToContextMap[obj2] = [context];

            //     }
            // }
            // console.log('added config: ', obj , ' to context: ', context);
        }

    }
    console.log('contex map => ', configToContextMap);
};


var appConfig = "{\"app\": [{\"settings\":[\"master\"],\"spaceid\":2023538075,\"enablePageStoreCache\":true,\"fauxdal\":{\"bucket\":\"DOTCOM12\",\"enabled\":false,\"key\":\"v\",\"value\":\"f\"},\"mrsOptions\":{\"mrs_host\":\"l.yimg.com/ny\",\"key\":\"mrs.highlander.crumbkey\",\"app_id\":\"highlander\"},\"ads\":{\"autoRotation\":10000,\"positions\":{\"DEFAULT\":{\"meta\":{\"stack\":\"ydc\"}},\"BTN\":{\"w\":120,\"h\":60,\"autoFetch\":false},\"BTN-1\":{\"w\":120,\"h\":60,\"autoFetch\":false},\"BTN-2\":{\"w\":120,\"h\":60,\"autoFetch\":false},\"BTN-3\":{\"w\":120,\"h\":60,\"autoFetch\":false},\"FOOT\":{\"id\":\"FOOT\",\"enable\":true,\"fr\":\"expIfr_exp\",\"autoFetch\":false},\"LREC\":{\"id\":\"LREC\",\"w\":300,\"h\":250,\"fr\":\"expIfr_exp\",\"autoFetch\":false,\"supports\":{\"exp-ovr\":1,\"exp-push\":1},\"enable\":true,\"staticLayout\":true,\"fdb\":true},\"LREC-1\":{\"id\":\"LREC-1\",\"w\":300,\"h\":250,\"autoFetch\":false,\"fr\":\"expIfr_exp\",\"supports\":{\"exp-ovr\":1,\"exp-push\":1},\"enable\":true,\"staticLayout\":true},\"LREC-2\":{\"id\":\"LREC-2\",\"w\":300,\"h\":250,\"autoFetch\":false,\"fr\":\"expIfr_exp\",\"supports\":{\"exp-ovr\":1,\"exp-push\":1},\"enable\":true,\"staticLayout\":true,\"fdb\":true},\"LREC2-1\":{\"id\":\"LREC2-1\",\"w\":300,\"h\":250,\"autoFetch\":false,\"fr\":\"expIfr_exp\",\"supports\":{\"exp-ovr\":1,\"exp-push\":1},\"enable\":true,\"staticLayout\":true,\"fdb\":true},\"LREC2\":{\"id\":\"LREC2\",\"w\":300,\"h\":250,\"autoFetch\":false,\"fr\":\"expIfr_exp\",\"supports\":{\"exp-ovr\":1,\"exp-push\":1},\"enable\":true,\"staticLayout\":true,\"fdb\":true},\"LREC3\":{\"id\":\"LREC3\",\"w\":300,\"h\":250,\"autoFetch\":false,\"fr\":\"expIfr_exp\",\"supports\":{\"exp-ovr\":1,\"exp-push\":1},\"enable\":true,\"staticLayout\":true,\"fdb\":true},\"LREC3-1\":{\"id\":\"LREC3-1\",\"w\":300,\"h\":250,\"autoFetch\":false,\"fr\":\"expIfr_exp\",\"supports\":{\"exp-ovr\":1,\"exp-push\":1},\"enable\":true,\"staticLayout\":true,\"fdb\":true},\"LDRB\":{\"id\":\"LDRB\",\"w\":728,\"h\":90,\"autoFetch\":false,\"fr\":\"expIfr_exp\",\"supports\":{\"exp-ovr\":1,\"exp-push\":1},\"enable\":true,\"staticLayout\":true,\"fdb\":true},\"LDRB-1\":{\"id\":\"LDRB-1\",\"w\":728,\"h\":90,\"autoFetch\":false,\"fr\":\"expIfr_exp\",\"supports\":{\"exp-ovr\":1,\"exp-push\":1},\"enable\":true,\"staticLayout\":true,\"fdb\":true},\"LDRP\":{\"id\":\"LDRP\",\"w\":320,\"h\":50,\"autoFetch\":false,\"fr\":\"expIfr_exp\",\"supports\":{\"exp-ovr\":1,\"exp-push\":1,\"lyr\":1},\"enable\":true,\"metaSize\":true,\"staticLayout\":true,\"fdb\":true},\"MAST\":{\"id\":\"MAST\",\"w\":970,\"h\":250,\"autoFetch\":false,\"fr\":\"expIfr_exp\",\"supports\":{\"exp-ovr\":1,\"exp-push\":1,\"resize-to\":1},\"enable\":true,\"staticLayout\":false,\"fdb\":false,\"closeBtn\":{\"mode\":2,\"useShow\":1},\"metaSize\":true},\"MFPAD\":{\"id\":\"MFPAD\",\"w\":720,\"h\":90,\"autoFetch\":false,\"enable\":true,\"fr\":\"expIfr_exp\",\"supports\":{\"exp-ovr\":1,\"exp-push\":1},\"metaSize\":true,\"staticLayout\":false,\"fdb\":false},\"MON-1\":{\"id\":\"MON-1\",\"w\":300,\"h\":600,\"fr\":\"expIfr_exp\",\"autoFetch\":false,\"supports\":{\"exp-ovr\":1,\"exp-push\":1},\"enable\":true,\"staticLayout\":true,\"fdb\":true},\"SPL\":{\"id\":\"SPL\",\"flex\":\"both\",\"enable\":true,\"autoFetch\":false,\"staticLayout\":false,\"fdb\":false,\"supports\":{\"cmsg\":1},\"uhslot\":\"YDC-UH\",\"meta\":{\"type\":\"stream\"},\"css\":\".Mags-FontA{font-family:'Freight Big Pro',Georgia,Times,serif;font-weight:300}.Mags-FontA.Size1{font-size:13px}.Mags-FontA.Size2{font-size:16px}.Mags-FontA.Size3{font-size:20px}.Mags-FontA.Size4{font-size:22px}.Mags-FontA.Size5{font-size:33px}.Mags-FontA.Size6{font-size:35px}.Mags-FontA.Size7{font-size:58px}.Mags-FontA.Size8{font-size:70px}.Mags-FontA.Size9{font-size:100px}.Mags-FontB{font-family:Georgia,Times,serif;font-weight:400}.Mags-FontB.Size1{font-size:18px}.Mags-FontC{font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:400}.Mags-FontC.Size1{font-size:11px}.Mags-FontC.Size2{font-size:14px}.Mags-FontC.Size3{font-size:16px}.Mags-FontC.Size4{font-size:20px}.Mags-FontC.Size5{font-size:30px}.Mags-FontC.Size6{font-size:32px}.Mags-FontC.Size7{font-size:52px}\"},\"SPL2\":{\"id\":\"SPL2\",\"autoFetch\":false,\"flex\":\"both\",\"enable\":true,\"staticLayout\":false,\"fdb\":false,\"supports\":{\"cmsg\":1},\"uhslot\":\"YDC-UH\",\"meta\":{\"stack\":\"ydc\",\"type\":\"stream\"},\"css\":\".Mags-FontA{font-family:'Freight Big Pro',Georgia,Times,serif;font-weight:300}.Mags-FontA.Size1{font-size:13px}.Mags-FontA.Size2{font-size:16px}.Mags-FontA.Size3{font-size:20px}.Mags-FontA.Size4{font-size:22px}.Mags-FontA.Size5{font-size:33px}.Mags-FontA.Size6{font-size:35px}.Mags-FontA.Size7{font-size:58px}.Mags-FontA.Size8{font-size:70px}.Mags-FontA.Size9{font-size:100px}.Mags-FontB{font-family:Georgia,Times,serif;font-weight:400}.Mags-FontB.Size1{font-size:18px}.Mags-FontC{font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:400}.Mags-FontC.Size1{font-size:11px}.Mags-FontC.Size2{font-size:14px}.Mags-FontC.Size3{font-size:16px}.Mags-FontC.Size4{font-size:20px}.Mags-FontC.Size5{font-size:30px}.Mags-FontC.Size6{font-size:32px}.Mags-FontC.Size7{font-size:52px}\"},\"SPRZ\":{\"id\":\"SPRZ\",\"autoFetch\":false,\"flex\":\"both\",\"enable\":true,\"staticLayout\":false,\"fdb\":false,\"supports\":{\"cmsg\":1},\"uhslot\":\"YDC-UH\"},\"SPON\":{\"pos\":\"SPON\",\"h\":1,\"id\":\"SPON\",\"w\":1,\"autoFetch\":false},\"WFPAD\":{\"id\":\"WFPAD\",\"w\":320,\"h\":50,\"autoFetch\":false,\"enable\":true,\"fr\":\"expIfr_exp\",\"supports\":{\"exp-ovr\":1,\"exp-push\":1,\"lyr\":1,\"resize-to\":1},\"metaSize\":true,\"staticLayout\":false,\"fdb\":false}},\"events\":{\"AUTO\":{\"name\":\"AUTO\",\"autoStart\":1,\"autoMax\":25,\"autoRT\":45000,\"autoIV\":1,\"autoDDG\":1,\"ps\":\"LREC,LREC2,LDRB\"}},\"rotationTimingDisabled\":false},\"beacon\":{\"defaultSrc\":\"td-app-yahoo\",\"beaconUncaughtJSError\":true,\"enableBatch\":false,\"pathPrefix\":\"https://www.yahoo.com/_td_api/beacon\",\"sampleSize\":1,\"sampleSizeUncaughtJSError\":100},\"esi\":{\"mode\":\"batch\",\"batchTimeout\":2,\"page\":{\"swr\":86400},\"staticRedirectToFS\":true},\"i13n\":{\"initComscore\":true,\"initRapid\":true,\"rapid\":{\"apiVersion\":\"3.29.1\",\"keys\":{\"ver\":\"ydotcom\",\"navtype\":\"server\"},\"compr_type\":\"deflate\",\"tracked_mods_viewability\":[],\"test_id\":\"\",\"webworker_file\":\"/lib/metro/g/myy/rapidworker_1_2_0.0.2.js\",\"client_only\":1,\"ywa\":{\"project_id\":1234567890,\"host\":\"y.analytics.yahoo.com\"},\"track_right_click\":true,\"pageview_on_init\":false,\"viewability\":true,\"perf_navigationtime\":2,\"perf_resourcetime\":1,\"dwell_on\":true},\"ywaMaps\":{\"cf\":{\"ad\":58,\"bpos\":24,\"cat\":25,\"ch\":120,\"cpos\":21,\"cposx\":118,\"ct\":23,\"cw\":119,\"dcl\":26,\"elm\":56,\"elmt\":57,\"enr\":112,\"err\":72,\"f\":40,\"ft\":51,\"itc\":111,\"mrkt\":12,\"noct\":101,\"olncust\":100,\"pcp\":67,\"pct\":48,\"pd\":46,\"pkgt\":22,\"pos\":117,\"prfm1\":41,\"prfm2\":43,\"prfm3\":44,\"prfm4\":45,\"pt\":13,\"rspns\":107,\"t1\":121,\"t2\":122,\"t3\":123,\"t4\":124,\"t5\":125,\"tar\":113,\"test\":14,\"tsrc\":69,\"sca\":53,\"sec\":18,\"site\":42,\"slk\":19,\"sp\":115,\"ver\":49},\"action\":{\"swp\":103,\"click\":12,\"secvw\":18,\"hvr\":115},\"outcome\":{\"fetch\":30,\"end\":31,\"dclent\":101,\"dclitm\":102,\"op\":105,\"cl\":106,\"nav\":108,\"svct\":109,\"unsvct\":110,\"rmsvct\":117,\"slct\":121,\"imprt\":123,\"lgn\":125,\"flagitm\":129,\"unflagitm\":130,\"flatcat\":131,\"unflagcat\":132,\"slctfltr\":133}},\"rootModelData\":{},\"navigationPageview\":{\"enable\":true},\"serverPageview\":{\"enable\":true,\"type\":\"nonClassified\"}},\"prefetch\":{\"content\":[{\"pageType\":\"content\",\"contentTypes\":[\"blogpost\",\"story\",\"slideshow\",\"cavideo\"]},{\"pageType\":\"index\"},{\"pageType\":\"preview\",\"contentTypes\":[\"story\"]}],\"index\":[{\"pageType\":\"content\",\"contentTypes\":[\"blogpost\",\"story\",\"slideshow\",\"cavideo\"]},{\"pageType\":\"preview\",\"contentTypes\":[\"story\"]}],\"intlMagazine\":[{\"pageType\":\"intlMagazineContent\",\"contentTypes\":[\"blogpost\",\"story\",\"slideshow\",\"cavideo\"]}],\"intlMagazineContent\":[{\"pageType\":\"intlMagazineContent\",\"contentTypes\":[\"blogpost\",\"story\",\"slideshow\",\"cavideo\"]},{\"pageType\":\"intlMagazine\"}],\"magcontent\":[{\"pageType\":\"magcontent\",\"contentTypes\":[\"blogpost\",\"story\",\"slideshow\",\"cavideo\"]},{\"pageType\":\"magpreview\",\"contentTypes\":[\"story\"]},{\"pageType\":\"maghome\"}],\"magpreview\":[{\"pageType\":\"magcontent\",\"contentTypes\":[\"blogpost\",\"story\",\"slideshow\",\"cavideo\"]},{\"pageType\":\"maghome\"}],\"maghome\":[{\"pageType\":\"magcontent\",\"contentTypes\":[\"blogpost\",\"story\",\"slideshow\",\"cavideo\"]},{\"pageType\":\"magpreview\",\"contentTypes\":[\"story\"]}],\"magtag\":[{\"pageType\":\"magcontent\",\"contentTypes\":[\"blogpost\",\"story\",\"slideshow\",\"cavideo\"]},{\"pageType\":\"magpreview\",\"contentTypes\":[\"story\"]}],\"preview\":[{\"pageType\":\"content\",\"contentTypes\":[\"blogpost\",\"story\",\"slideshow\",\"cavideo\"]},{\"pageType\":\"index\"}]},\"redirectOn404\":true,\"clientEligible\":{\"index\":\"*\",\"content\":\"*\"},\"timeouts\":{\"page\":3000,\"xhr\":3500},\"pageTransition\":{\"enabled\":false}},{\"settings\":[\"mode:failsafe\"],\"i13n\":{\"rapid\":{\"keys\":{\"err\":\"failsafe\"}}}},{\"settings\":[\"device:smartphone\"],\"spaceid\":1197228339,\"i13n\":{\"rapid\":{\"ywa\":{\"project_id\":10001806365479}}},\"renderTargets\":[{\"id\":\"default\",\"classNames\":\"js-viewer-pagewrapper\"},{\"id\":\"viewer\",\"classNames\":\"js-viewer-viewerwrapper\"}],\"pageTransition\":{\"enabled\":true,\"handleSameTarget\":false,\"viewerAnimation\":\"slide\",\"preRenderContent\":true,\"preRenderConfig\":{\"initPaddingTop\":100,\"paddingTop\":50,\"interval\":12}}},{\"settings\":[\"bucket:91201\"],\"i13n\":{\"rapid\":{\"yql_host\":\"geo-mh.query.yahoo.com\"}}},{\"settings\":[\"environment:development\"],\"esi\":{\"batchTimeout\":5},\"mrsOptions\":{\"mrs_host\":\"sandbox.mrs.mobile.yahoo.com\",\"key\":\"mrs.dev.crumbkey\",\"app_id\":\"dev\"}},{\"settings\":[\"environment:int\"],\"mrsOptions\":{\"mrs_host\":\"sandbox.mrs.mobile.yahoo.com\",\"key\":\"mrs.dev.crumbkey\",\"app_id\":\"dev\"}},{\"settings\":[\"environment:qa\"],\"mrsOptions\":{\"mrs_host\":\"sandbox.mrs.mobile.yahoo.com\",\"key\":\"mrs.dev.crumbkey\",\"app_id\":\"dev\"}},{\"settings\":[\"bucket:clientEligible\"],\"clientEligible\":{\"index\":[],\"content\":[]}},{\"settings\":[\"bucket:clientEligible2\"],\"clientEligible\":{\"index\":[\"news\"],\"content\":[\"news\"]}},{\"settings\":[\"environment:production\"],\"clientEligible\":{\"index\":[\"autos\",\"beauty\",\"celebrity\",\"food\",\"gma\",\"health\",\"katiecouric\",\"makers\",\"movies\",\"news\",\"music\",\"parenting\",\"politics\",\"style\",\"tech\",\"travel\",\"tv\"],\"content\":[\"autos\",\"beauty\",\"celebrity\",\"food\",\"gma\",\"health\",\"katiecouric\",\"makers\",\"movies\",\"news\",\"music\",\"parenting\",\"politics\",\"style\",\"tech\",\"travel\",\"tv\"]},\"timeouts\":{\"page\":3000,\"xhr\":1500}},{\"settings\":[\"environment:production\",\"device:smartphone\"],\"clientEligible\":{\"index\":\"*\",\"content\":\"*\"},\"timeouts\":{\"xhr\":3000}},{\"settings\":[\"environment:production\",\"device:tablet\"],\"clientEligible\":{\"index\":\"*\",\"content\":\"*\"}},{\"settings\":[\"environment:production\",\"site:news\"],\"clientEligible\":{\"index\":[\"news\"],\"content\":[\"news\"]}},{\"settings\":[\"environment:production\",\"site:finance\"],\"clientEligible\":{\"index\":[\"finance\"],\"content\":[\"finance\"]}},{\"settings\":[\"environment:production\",\"site:sports\"],\"clientEligible\":{\"index\":[\"sports\"],\"content\":[\"sports\"]}},{\"settings\":[\"device:desktop-lite\"],\"i13n\":{\"rapid\":{\"pageview_on_init\":true}}},{\"settings\":[\"device:smartphone-lite\"],\"i13n\":{\"rapid\":{\"pageview_on_init\":true}}},{\"settings\":[\"device:tablet-lite\"],\"i13n\":{\"rapid\":{\"pageview_on_init\":true}}},{\"settings\":[\"bucket:405\"],\"ads\":{\"autoadrender\":true}},{\"settings\":[\"bucket:407\"],\"ads\":{\"autoadrender\":true}}]}";
var adsConfig = "{\"autoRotation\":10000,\"positions\":{\"DEFAULT\":{\"meta\":{\"stack\":\"ydc\"}},\"BTN\":{\"w\":120,\"h\":60,\"autoFetch\":false},\"BTN-1\":{\"w\":120,\"h\":60,\"autoFetch\":false},\"BTN-2\":{\"w\":120,\"h\":60,\"autoFetch\":false},\"BTN-3\":{\"w\":120,\"h\":60,\"autoFetch\":false},\"FOOT\":{\"id\":\"FOOT\",\"enable\":true,\"fr\":\"expIfr_exp\",\"autoFetch\":false},\"LREC\":{\"id\":\"LREC\",\"w\":300,\"h\":250,\"fr\":\"expIfr_exp\",\"autoFetch\":false,\"supports\":{\"exp-ovr\":1,\"exp-push\":1},\"enable\":true,\"staticLayout\":true,\"fdb\":true},\"LREC-1\":{\"id\":\"LREC-1\",\"w\":300,\"h\":250,\"autoFetch\":false,\"fr\":\"expIfr_exp\",\"supports\":{\"exp-ovr\":1,\"exp-push\":1},\"enable\":true,\"staticLayout\":true},\"LREC-2\":{\"id\":\"LREC-2\",\"w\":300,\"h\":250,\"autoFetch\":false,\"fr\":\"expIfr_exp\",\"supports\":{\"exp-ovr\":1,\"exp-push\":1},\"enable\":true,\"staticLayout\":true,\"fdb\":true},\"LREC2-1\":{\"id\":\"LREC2-1\",\"w\":300,\"h\":250,\"autoFetch\":false,\"fr\":\"expIfr_exp\",\"supports\":{\"exp-ovr\":1,\"exp-push\":1},\"enable\":true,\"staticLayout\":true,\"fdb\":true},\"LREC2\":{\"id\":\"LREC2\",\"w\":300,\"h\":250,\"autoFetch\":false,\"fr\":\"expIfr_exp\",\"supports\":{\"exp-ovr\":1,\"exp-push\":1},\"enable\":true,\"staticLayout\":true,\"fdb\":true},\"LREC3\":{\"id\":\"LREC3\",\"w\":300,\"h\":250,\"autoFetch\":false,\"fr\":\"expIfr_exp\",\"supports\":{\"exp-ovr\":1,\"exp-push\":1},\"enable\":true,\"staticLayout\":true,\"fdb\":true},\"LREC3-1\":{\"id\":\"LREC3-1\",\"w\":300,\"h\":250,\"autoFetch\":false,\"fr\":\"expIfr_exp\",\"supports\":{\"exp-ovr\":1,\"exp-push\":1},\"enable\":true,\"staticLayout\":true,\"fdb\":true},\"LDRB\":{\"id\":\"LDRB\",\"w\":728,\"h\":90,\"autoFetch\":false,\"fr\":\"expIfr_exp\",\"supports\":{\"exp-ovr\":1,\"exp-push\":1},\"enable\":true,\"staticLayout\":true,\"fdb\":true},\"LDRB-1\":{\"id\":\"LDRB-1\",\"w\":728,\"h\":90,\"autoFetch\":false,\"fr\":\"expIfr_exp\",\"supports\":{\"exp-ovr\":1,\"exp-push\":1},\"enable\":true,\"staticLayout\":true,\"fdb\":true},\"LDRP\":{\"id\":\"LDRP\",\"w\":320,\"h\":50,\"autoFetch\":false,\"fr\":\"expIfr_exp\",\"supports\":{\"exp-ovr\":1,\"exp-push\":1,\"lyr\":1},\"enable\":true,\"metaSize\":true,\"staticLayout\":true,\"fdb\":true},\"MAST\":{\"id\":\"MAST\",\"w\":970,\"h\":250,\"autoFetch\":false,\"fr\":\"expIfr_exp\",\"supports\":{\"exp-ovr\":1,\"exp-push\":1,\"resize-to\":1},\"enable\":true,\"staticLayout\":false,\"fdb\":false,\"closeBtn\":{\"mode\":2,\"useShow\":1},\"metaSize\":true},\"MFPAD\":{\"id\":\"MFPAD\",\"w\":720,\"h\":90,\"autoFetch\":false,\"enable\":true,\"fr\":\"expIfr_exp\",\"supports\":{\"exp-ovr\":1,\"exp-push\":1},\"metaSize\":true,\"staticLayout\":false,\"fdb\":false},\"MON-1\":{\"id\":\"MON-1\",\"w\":300,\"h\":600,\"fr\":\"expIfr_exp\",\"autoFetch\":false,\"supports\":{\"exp-ovr\":1,\"exp-push\":1},\"enable\":true,\"staticLayout\":true,\"fdb\":true},\"SPL\":{\"id\":\"SPL\",\"flex\":\"both\",\"enable\":true,\"autoFetch\":false,\"staticLayout\":false,\"fdb\":false,\"supports\":{\"cmsg\":1},\"uhslot\":\"YDC-UH\",\"meta\":{\"type\":\"stream\"},\"css\":\".Mags-FontA{font-family:'Freight Big Pro',Georgia,Times,serif;font-weight:300}.Mags-FontA.Size1{font-size:13px}.Mags-FontA.Size2{font-size:16px}.Mags-FontA.Size3{font-size:20px}.Mags-FontA.Size4{font-size:22px}.Mags-FontA.Size5{font-size:33px}.Mags-FontA.Size6{font-size:35px}.Mags-FontA.Size7{font-size:58px}.Mags-FontA.Size8{font-size:70px}.Mags-FontA.Size9{font-size:100px}.Mags-FontB{font-family:Georgia,Times,serif;font-weight:400}.Mags-FontB.Size1{font-size:18px}.Mags-FontC{font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:400}.Mags-FontC.Size1{font-size:11px}.Mags-FontC.Size2{font-size:14px}.Mags-FontC.Size3{font-size:16px}.Mags-FontC.Size4{font-size:20px}.Mags-FontC.Size5{font-size:30px}.Mags-FontC.Size6{font-size:32px}.Mags-FontC.Size7{font-size:52px}\"},\"SPL2\":{\"id\":\"SPL2\",\"autoFetch\":false,\"flex\":\"both\",\"enable\":true,\"staticLayout\":false,\"fdb\":false,\"supports\":{\"cmsg\":1},\"uhslot\":\"YDC-UH\",\"meta\":{\"stack\":\"ydc\",\"type\":\"stream\"},\"css\":\".Mags-FontA{font-family:'Freight Big Pro',Georgia,Times,serif;font-weight:300}.Mags-FontA.Size1{font-size:13px}.Mags-FontA.Size2{font-size:16px}.Mags-FontA.Size3{font-size:20px}.Mags-FontA.Size4{font-size:22px}.Mags-FontA.Size5{font-size:33px}.Mags-FontA.Size6{font-size:35px}.Mags-FontA.Size7{font-size:58px}.Mags-FontA.Size8{font-size:70px}.Mags-FontA.Size9{font-size:100px}.Mags-FontB{font-family:Georgia,Times,serif;font-weight:400}.Mags-FontB.Size1{font-size:18px}.Mags-FontC{font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:400}.Mags-FontC.Size1{font-size:11px}.Mags-FontC.Size2{font-size:14px}.Mags-FontC.Size3{font-size:16px}.Mags-FontC.Size4{font-size:20px}.Mags-FontC.Size5{font-size:30px}.Mags-FontC.Size6{font-size:32px}.Mags-FontC.Size7{font-size:52px}\"},\"SPRZ\":{\"id\":\"SPRZ\",\"autoFetch\":false,\"flex\":\"both\",\"enable\":true,\"staticLayout\":false,\"fdb\":false,\"supports\":{\"cmsg\":1},\"uhslot\":\"YDC-UH\"},\"SPON\":{\"pos\":\"SPON\",\"h\":1,\"id\":\"SPON\",\"w\":1,\"autoFetch\":false},\"WFPAD\":{\"id\":\"WFPAD\",\"w\":320,\"h\":50,\"autoFetch\":false,\"enable\":true,\"fr\":\"expIfr_exp\",\"supports\":{\"exp-ovr\":1,\"exp-push\":1,\"lyr\":1,\"resize-to\":1},\"metaSize\":true,\"staticLayout\":false,\"fdb\":false}},\"events\":{\"AUTO\":{\"name\":\"AUTO\",\"autoStart\":1,\"autoMax\":25,\"autoRT\":45000,\"autoIV\":1,\"autoDDG\":1,\"ps\":\"LREC,LREC2,LDRB\"}},\"rotationTimingDisabled\":false}";

getContextForConfig(appConfig);