(function () {
    'use strict';

    angular
        .module('app', []);

    angular
        .module('app')
        .config(['$interpolateProvider', function ($interpolateProvider) {
            $interpolateProvider.startSymbol('[[');
            $interpolateProvider.endSymbol(']]');
        }]);

    angular
        .module('app')
        .controller('Navigation', ['$scope', '$http', '$location', navigation]);

    function setActiveClassAttribute(data, currentLocation, siteUrl) {
        var dataLength = data.length;
        for (var i = 0; i < dataLength; i++) {
            var item = data[i];

            var itemUrl = item.url.replace(/\/$/, '');
            item.active = ( (currentLocation.indexOf(itemUrl) > -1) && (itemUrl !== siteUrl) );
            var children = item.children || [];
            setActiveClassAttribute(children, currentLocation, siteUrl);
        }
    }

    function getNavigationData(baseurl) {
        var esc = function(resource) {
            return baseurl + "/" + resource + ".html";
        };

        var data = [
            { 'name': 'Home', 'url': esc('index')  },
            { 'name': 'Aktuelles', 'url': esc('blog') },
            { 'name': 'Wir stellen uns vor', 'url': esc('vorstellung'), 'children': [
                    { 'name': 'Begrüßung', 'url': esc('begruessung') },
                    { 'name': 'Sprech- und -Bürozeiten', 'url': esc('sprech-und-buerozeiten') },
                    { 'name': 'Schulische Gremien', 'url': esc('schulische-gremien') },
                    { 'name': 'Pressespiegel', 'url': esc('pressespiegel') } 
                ]
            },
            { 'name': 'Anmeldung', 'url': esc('anmeldung') },
            { 'name': 'Berufsorientierung', 'url': esc('berufsorientierung') },
            { 'name': 'Pädagogik', 'url': esc('unsere-paedagogik'), 'children': [
                    { 'name': 'Schulhistorie', 'url': esc('schulhistorie') },
                    { 'name': 'Das Schulprogramm', 'url': esc('schulprogramm') },
                    { 'name': 'Das Lehrerraum-Prinzip', 'url': esc('lehrerraum-prinzip') },
                    { 'name': 'Das 67.5 Minutenraster', 'url': esc('das-67-5-minuten-raster') },
                    { 'name': 'Qualität - mehr als ein Modewort', 'url': esc('qualitaet') },
                    { 'name': 'Partner und Patenschaften', 'url': esc('partner-und-patenschaften') },
                    { 'name': 'Arbeitsgemeinschaften', 'url': esc('arbeitsgemeinschaften') },
                    { 'name': 'Das Merkheft', 'url': esc('merkheft') } 
                ]
            },
            { 'name': 'Rund ums Haus', 'url': esc('rund-ums-haus-xxx'), 'children': [
                    { 'name': 'Mittagessen und Hausaufgabenbetreuung', 'url': esc('mittagessen-und-hausaufgabenbetreuung') },
                    { 'name': 'Lage und Anfahrt', 'url': esc('lage-und-anfahrt') },
                    { 'name': 'Gebäude und Gelände', 'url': esc('gebaeude-und-gelaende') },
                    { 'name': 'Spind-Angebot', 'url': esc('spind-angebot') }
                ]
            },
            { 'name': 'Unterricht', 'url': esc('unterricht'), 'children': [
                    { 'name': 'Unsere Schule in Zahlen', 'url': esc('aktuelle-statistik') },
                    { 'name': 'Unser Kollegium', 'url': esc('kollegium') },
                    { 'name': 'Schulordnung', 'url': esc('schulordnung') },
                    { 'name': 'Versetzungsordnung', 'url': esc('versetzungsordnung') },
                    { 'name': 'Kopfnoten', 'url': esc('kopfnoten') },
                    { 'name': 'Schulbücher und -material', 'url': esc('schulmaterial') },
                    { 'name': 'Schulbücherei/Medien', 'url': esc('schulbuecherei') },
                    { 'name': 'Schüleraustausch Frankreich', 'url': esc('schueleraustausch-frankreich') },
                    { 'name': 'Fahrtenangebote', 'url': esc('fahrtenangebote') },
                    { 'name': 'Galerie der Kunst-Klassen', 'url': esc('galerie-der-kunst-klassen') },
                    { 'name': 'Stundentafel', 'url': esc('stundentafel') },
                    { 'name': 'Lehrpläne', 'url': esc('curriculum-und-lehrplaene') },
                    { 'name': 'Schüler helfen Schülern', 'url': esc('schueler-helfen-schuelern') },
                    { 'name': 'Ergänzungs- und Förderunterricht', 'url': esc('ergaenzungs-und-foerderunterricht') },
                    { 'name': 'Profil-Klassen', 'url': esc('profilklassen') },
                    { 'name': 'Schulsozialarbeit', 'url': esc('schulsozialarbeit') },
                    { 'name': 'Hilfe bei Lernstörungen', 'url': esc('hilfe-bei-lernstoerungen') },
                    { 'name': 'Hochbegabung', 'url': esc('hochbegabung') },
                    { 'name': 'Bunter Alltag', 'url': esc('bunter-alltag') }
                ]
            },
            { 'name': 'Schul-Laufbahn', 'url': esc('schullaufbahn'), 'children': [
                    { 'name': 'Anmeldung', 'url': esc('anmeldung2') },
                    { 'name': 'Sanfter Übergang - Lernen lernen!', 'url': esc('sanfter-uebergang') },
                    { 'name': 'Startprojekt Ich/Wir/Eine Welt', 'url': esc('startprojekt-ich-wir-eine-welt') },
                    { 'name': 'Erprobungsstufe Klasse 5 und 6', 'url': esc('erprobungsstufe-klasse-5-und-6') },
                    { 'name': 'Differenzierung ab Klasse 7', 'url': esc('differenzierung-ab-klasse-7') },
                    { 'name': 'Lernstandserhebungen in Klasse 8', 'url': esc('lernstandserhebungen-in-klasse-8') },
                    { 'name': 'Praktika', 'url': esc('praktika') },
                    { 'name': 'Berufsvorbereitung', 'url': esc('berufsvorbereitung') },
                    { 'name': 'Zentrale Prüfungen in Klasse 10', 'url': esc('zentrale-pruefungen-in-klasse-10') },
                    { 'name': 'Abschlüsse der Realschule', 'url': esc('abschluesse-der-realschule') }
                ]
            },
            { 'name': 'Projekte', 'url': esc(''), 'children': [
                    { 'name': 'Nachhaltigkeit im Schulalltag', 'url': esc('nachhaltigkeit-im-schulalltag') },
                    { 'name': 'Schulprofil Gesund lernen', 'url': esc('schulprofil-gesund-lernen') },
                    { 'name': 'Nachdenkraum-Projekt', 'url': esc('nachdenkraum-projekt') },
                    { 'name': 'Streitschlichter-Projekt', 'url': esc('streitschlichter-projekt') },
                    { 'name': 'Gewaltpräventionsprojekt', 'url': esc('gewaltpraevention') },
                    { 'name': 'Vorlesewettbewerb', 'url': esc('vorlesewettbewerb') },
                    { 'name': 'Big Challenge', 'url': esc('big-challenge') },
                    { 'name': 'DELF Zertifikat', 'url': esc('delf-zertifikat') },
                    { 'name': 'Känguruh der Mathematik', 'url': esc('kaenguru-der-mathematik') },
                    { 'name': 'Sponsorenlauf', 'url': esc('sponsorenlauf') },
                    { 'name': 'Togo-Projekt', 'url': esc('togo-projekt') },
                    { 'name': 'Sportveranstaltungen', 'url': esc('sportveranstaltungen') }
                ]
            },
            { 'name': 'Termine', 'url': esc('termine') },
            { 'name': 'Schul-Check', 'url': esc('schulcheck') },
            { 'name': 'Eltern', 'url': esc('eltern'), 'children': [
                    { 'name': 'Schulpflegschaft', 'url': esc('schulpflegschaft') },
                    { 'name': 'Klassenpflegschaft', 'url': esc('klassenpflegschaft') },
                    { 'name': 'Fachkonferenzen', 'url': esc('fachkonferenzen') },
                    { 'name': 'Förderverein der Schule', 'url': esc('foerderverein') }
                ]
            },
            { 'name': 'Schüler', 'url': esc('schueler'), 'children': [
                  { 'name': 'Wir nehmen Einfluss!', 'url': esc('wir-nehmen-einfluss') },
                  { 'name': 'Wir wollen\'s wissen!', 'url': esc('wir-wollen-es-wissen') },
                  { 'name': 'Wir können was!', 'url': esc('wir-koennen-was') },
                  { 'name': 'Wir sind gut drauf! Meistens...', 'url': esc('wir-sind-gut-drauf') }
                ]
            },
            { 'name': 'Lehrer', 'url': esc('lehrer') },
            { 'name': 'Wichtige Links und Adressen!', 'url': esc('adressen'), 'children': [
                    { 'name': 'Üben & Lernen', 'url': esc('ueben-und-lernen') },
                    { 'name': 'Downloads', 'url': esc('arbeitsmaterialien-zum-download') },
                    { 'name': 'Institutionen', 'url': esc('institutionen') },
                    { 'name': 'Schulbücher', 'url': esc('schulbuecher-kaufen') },
                    { 'name': 'Links zur Ausbildungsplatzsuche', 'url': esc('links-zur-ausbildungsplatzsuche') },
                    { 'name': 'Links zur Schule', 'url': esc('links-rund-um-schule-und-familie') }
                ]
            },
            { 'name': 'Impressum', 'url': esc('impressum') },
            { 'name': 'Haftungsausschluss', 'url': esc('haftungsausschluss') },
            { 'name': 'Häufig gestellte Fragen', 'url': esc('haeufig-gestellte-fragen') },
            { 'name': 'Archiv', 'url': esc('archiv') }
        ];

        return data;
    }

    function navigation($scope, $http, $location) {
        console.log('Configured site URL: \'' + golzheim_site_url + '\''); // This comes via base_scripts.html include file

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
