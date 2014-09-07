(function () {
    'use strict';

    angular
        .module('app', []);

    angular
        .module('app')
        .config(["$interpolateProvider", function ($interpolateProvider) {
            $interpolateProvider.startSymbol('[[');
            $interpolateProvider.endSymbol(']]');
        }]);

    angular
        .module('app')
        .controller('Navigation', ["$scope", "$http", "$location", navigation]);

    function setActiveClassAttribute(data, currentLocation, siteUrl) {
        var dataLength = data.length;
        for (var i = 0; i < dataLength; i++) {
            var item = data[i];

            var itemUrl = item.url.replace(/\/$/, '');
            item.active = ( (currentLocation.indexOf(itemUrl) > -1) && (itemUrl !== siteUrl) );
            if (item.active) {
                console.log("Treffer für \"" + itemUrl + "\""); // + " " + JSON.stringify(item, undefined, 2));
            }

            var children = item.children || [];
            setActiveClassAttribute(children, currentLocation, siteUrl);
        }
    }

    function getNavigationData(baseurl) {
        var esc = function(resource) {
            return baseurl + "/" + resource + ".html";
        };

        var data = [
            { "name": "Home", "url": esc('index')  },
            { "name": "Aktuelles", "url": esc('blog') },
            { "name": "Wir stellen uns vor", 'url': esc('vorstellung'), "children": [
                    { "name": "Begrüßung", "url": esc('begruessung') },
                    { "name": "Sprech- und -Bürozeiten", "url": esc('sprech-und-buerozeiten') },
                    { "name": "Schulische Gremien", "url": esc('schulische-gremien') },
                    { "name": "Pressespiegel", "url": esc('pressespiegel') } ]
            },
            { "name": "Anmeldung", "url": esc("schule/02-anmeldung/") },
            { "name": "Berufsorientierung", "url": esc("schule/03-berufsorientierung/") },
            { "name": "Pädagogik", "url": esc("schule/04a-paedagogik/"), "children": [
                    { "name": "Schulhistorie", "url": esc("schule/04a-paedagogik/01-schulgeschichte/") },
                    { "name": "Das Schulprogramm", "url": esc("schule/04a-paedagogik/02a-schulprogramm/") },
                    { "name": "Das Lehrerraum-Prinzip", "url": esc("schule/04a-paedagogik/02b-lehrerraum-prinzip/") },
                    { "name": "Das 67.5 Minutenraster", "url": esc("schule/04a-paedagogik/02c-das-67-5-minuten-raster/") },
                    { "name": "Qualität - mehr als ein Modewort", "url": esc("schule/04a-paedagogik/03-qualitaet/") },
                    { "name": "Partner und Patenschaften", "url": esc("schule/04a-paedagogik/04-partner-und-patenschaften/") },
                    { "name": "Arbeitsgemeinschaften", "url": esc("schule/04a-paedagogik/08-arbeitsgemeinschaften/") },
                    { "name": "Das Merkheft", "url": esc("schule/04a-paedagogik/09-merkheft/") } ]
            },
            { "name": "Unterricht", "url": esc("schule/04b-unterricht/"), "children": [
                    { "name": "Unsere Schule in Zahlen", "url": esc("schule/04b-unterricht/01-aktuelle-statistik/") },
                    { "name": "Unser Kollegium", "url": esc("schule/04b-unterricht/02-kollegium/") },
                    { "name": "Schulordnung", "url": esc("schule/04b-unterricht/03-schulordnung/") },
                    { "name": "Versetzungsordnung", "url": esc("schule/04b-unterricht/04-versetzungsordnung/") },
                    { "name": "Kopfnoten", "url": esc("schule/04b-unterricht/05-kopfnoten/") },
                    { "name": "Schulbücher und -material", "url": esc("schule/04b-unterricht/06-schulmaterial/") },
                    { "name": "Schulbücherei/Medien", "url": esc("schule/04b-unterricht/07-schulbuecherei/") },
                    { "name": "Schüleraustausch Frankreich", "url": esc("schule/04b-unterricht/08-schueleraustausch-frankreich/") },
                    { "name": "Fahrtenangebote", "url": esc("schule/04b-unterricht/09-fahrtenangebote/") },
                    { "name": "Galerie der Kunst-Klassen", "url": esc("schule/04b-unterricht/10-galerie-der-kunst-klassen/") },
                    { "name": "Stundentafel", "url": esc("schule/04b-unterricht/11-stundentafel/") },
                    { "name": "Lehrpläne", "url": esc("schule/04b-unterricht/12-curriculum-undlehrplaene/") },
                    { "name": "Schüler helfen Schülern", "url": esc("schule/04b-unterricht/13-schueler-helfen-schuelern/") },
                    { "name": "Ergänzungs- und Förderunterricht", "url": esc("schule/04b-unterricht/14-ergaenzungs-und-foerderunterricht/") },
                    { "name": "Profil-Klassen", "url": esc("schule/04b-unterricht/15-profilklassen/") },
                    { "name": "Schulsozialarbeit", "url": esc("schule/04b-unterricht/16-schulsozialarbeit/") },
                    { "name": "Hilfe bei Lernstörungen", "url": esc("schule/04b-unterricht/17-hilfe-bei-lernstoerungen/") },
                    { "name": "Hochbegabung", "url": esc("schule/04b-unterricht/18-hochbegabung/") },
                    { "name": "Bunter Alltag", "url": esc("schule/04b-unterricht/19-bunter-alltag/") }
                ]
            },
            { "name": "Schul-Laufbahn", "url": esc("schule/04c-schullaufbahn/"), "children": [
                    { "name": "Anmeldung", "url": esc("schule/04c-schullaufbahn/01-anmeldung/") },
                    { "name": "Sanfter Übergang - Lernen lernen!", "url": esc("schule/04c-schullaufbahn/02-sanfter-uebergang/") },
                    { "name": "Startprojekt Ich/Wir/Eine Welt", "url": esc("schule/04c-schullaufbahn/03-startprojekt-ich-wir-einewelt/") },
                    { "name": "Erprobungsstufe Klasse 5 und 6", "url": esc("schule/04c-schullaufbahn/04-erprobungsstufe-klasse-5-und-6/") },
                    { "name": "Differenzierung ab Klasse 7", "url": esc("schule/04c-schullaufbahn/05-differenzierung-ab-klasse-7/") },
                    { "name": "Lernstandserhebungen in Klasse 8", "url": esc("schule/04c-schullaufbahn/06-lernstandserhebungen-in-klasse-8/") },
                    { "name": "Praktika", "url": esc("schule/04c-schullaufbahn/07-praktika/") },
                    { "name": "Berufsvorbereitung", "url": esc("schule/04c-schullaufbahn/08-berufsvorbereitung/") },
                    { "name": "Zentrale Prüfungen in Klasse 10", "url": esc("schule/04c-schullaufbahn/09-zentrale-pruefungen-in-klasse-10/") },
                    { "name": "Abschlüsse der Realschule", "url": esc("schule/04c-schullaufbahn/10-abschluesse-der-realschule/") }
                ]
            },
            { "name": "Projekte", "url": esc("schule/04d-projekte/"), "children": [
                    { "name": "Nachhaltigkeit im Schulalltag", "url": esc("schule/04d-projekte/01-nachhaltigkeit-im-schulalltag/") },
                    { "name": "Schulprofil Gesund lernen", "url": esc("schule/04d-projekte/02-schulprofil-gesund-lernen/") },
                    { "name": "Nachdenkraum-Projekt", "url": esc("schule/04d-projekte/03-nachdenkraum-projekt/") },
                    { "name": "Streitschlichter-Projekt", "url": esc("schule/04d-projekte/04-streitschlichter-projekt/") },
                    { "name": "Gewaltpräventionsprojekt", "url": esc("schule/04d-projekte/05-gewaltpraevention/") },
                    { "name": "Vorlesewettbewerb", "url": esc("schule/04d-projekte/06-vorlesewettbewerb/") },
                    { "name": "Big Challenge", "url": esc("schule/04d-projekte/07-big-challenge/") },
                    { "name": "DELF Zertifikat", "url": esc("schule/04d-projekte/08-delf-zertifikat/") },
                    { "name": "Känguruh der Mathematik", "url": esc("schule/04d-projekte/09-kaenguru-der-mathematik/") },
                    { "name": "Sponsorenlauf", "url": esc("schule/04d-projekte/10-sponsorenlauf/") },
                    { "name": "Togo-Projekt", "url": esc("schule/04d-projekte/11-togo-projekt/") },
                    { "name": "Sportveranstaltungen", "url": esc("schule/04d-projekte/12-sportveranstaltungen/") }
                ]
            },
            { "name": "Termine", "url": esc("schule/05-termine/") },
            { "name": "Schul-Check", "url": esc("schule/06-schulcheck/") },
            { "name": "Eltern", "url": esc("schule/07-eltern/"), "children": [
                    { "name": "Schulpflegschaft", "url": esc("schule/07-eltern/01-schulpflegschaft/") },
                    { "name": "Klassenpflegschaft", "url": esc("schule/07-eltern/02-klassenpflegschaft/") },
                    { "name": "Fachkonferenzen", "url": esc("schule/07-eltern/03-fachkonferenzen/") },
                    { "name": "Förderverein der Schule", "url": esc("schule/07-eltern/04-foerderverein/") }
                ]
            },
            { "name": "Schüler", "url": esc("schule/08-schueler/"), "children": [
                  { "name": "Wir nehmen Einfluss!", "url": esc("schule/08-schueler/01-wir-nehmen-einfluss/") },
                  { "name": "Wir wollen's wissen!", "url": esc("schule/08-schueler/02-wir-wollen-es-wissen/") },
                  { "name": "Wir können was!", "url": esc("schule/08-schueler/03-wir-koennen-was/") },
                  { "name": "Wir sind gut drauf! Meistens...", "url": esc("schule/08-schueler/04-wir-sind-gut-drauf--meistens/") }
                ]
            },
            { "name": "Lehrer", "url": esc("schule/09-lehrer/") },
            { "name": "Wichtige Links und Adressen!", "url": esc("schule/10-adressen/"), "children": [
                    { "name": "Üben & Lernen", "url": esc("schule/10-adressen/01-ueben-und-lernen/") },
                    { "name": "Downloads", "url": esc("schule/10-adressen/02-arbeitsmaterialien-zum-download/") },
                    { "name": "Institutionen", "url": esc("schule/10-adressen/03-institutionen/") },
                    { "name": "Schulbücher", "url": esc("schule/10-adressen/04-schulbuecher-kaufen/") },
                    { "name": "Links zur Ausbildungsplatzsuche", "url": esc("schule/10-adressen/05-links-zur-ausbildungsplatzsuche/") },
                    { "name": "Links zur Schule", "url": esc("schule/10-adressen/06-links-rund-um-schule-und-familie/") }
                ]
            },
            { "name": "Impressum", "url": esc("impressum") },
            { "name": "Haftungsausschluss", "url": esc("haftungsausschluss") },
            { "name": "Häufig gestellte Fragen", "url": esc("haeufig-gestellte-fragen") },
            { "name": "Archiv", "url": esc("archiv") }
        ];

        return data;
    }

    function navigation($scope, $http, $location) {
        console.log("Configured site URL: \"" + golzheim_site_url + "\""); // This comes via base_scripts.html include file

        $scope.locationpath = $location.path();
        $scope.locationwindow = window.location.href;

        var offline = true;
        if (offline) {
            $scope.data = getNavigationData(golzheim_site_url);
            setActiveClassAttribute($scope.data, $scope.locationwindow, golzheim_site_url);
        } else {
            $http.get('api/Navigation').success(function (data) {
                $scope.data = data;
                setActiveClassAttribute($scope.data, $scope.locationwindow, golzheim_site_url);
            });
        }
    }
})();
