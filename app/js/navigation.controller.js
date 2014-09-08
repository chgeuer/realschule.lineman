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

    function navigation($scope, $http, $location) {
        $scope.locationpath = $location.path();
        $scope.locationwindow = window.location.href;
        $scope.data = getNavigationData(golzheim_site_url);
        setActiveClassAttribute($scope.data, $scope.locationwindow, golzheim_site_url);
    }

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
        var page = function(text, resource, children) {
            var result = { 
                'name': text, 
                'url': baseurl + "/" + resource + ".html" 
            };

            if (children != null) {
                result.children = children;
            }

            return result;
        };

        return [
            page('Start', 'index'),
            page('Aktuelles', 'blog'),
            page('Wir stellen uns vor', 'vorstellung', [
                    page('Begrüßung', 'begruessung'),
                    page('Sprech- und -Bürozeiten', 'sprech-und-buerozeiten'),
                    page('Schulische Gremien', 'schulische-gremien'),
                    page('Pressespiegel', 'pressespiegel')
                ]
            ),
            page('Anmeldung', 'anmeldung'),
            page('Berufsorientierung', 'berufsorientierung'),
            page('Pädagogik', 'unsere-paedagogik', [
                    page('Schulhistorie', 'schulhistorie'),
                    page('Das Schulprogramm', 'schulprogramm'),
                    page('Das Lehrerraum-Prinzip', 'lehrerraum-prinzip'),
                    page('Das 67.5 Minutenraster', 'das-67-5-minuten-raster'),
                    page('Qualität - mehr als ein Modewort', 'qualitaet'),
                    page('Partner und Patenschaften', 'partner-und-patenschaften'),
                    page('Arbeitsgemeinschaften', 'arbeitsgemeinschaften'),
                    page('Das Merkheft', 'merkheft') 
                ]
            ),
            page('Rund ums Haus', 'rund-ums-haus', [
                    page('Mittagessen und Hausaufgabenbetreuung', 'mittagessen-und-hausaufgabenbetreuung'),
                    page('Lage und Anfahrt', 'lage-und-anfahrt'),
                    page('Gebäude und Gelände', 'gebaeude-und-gelaende'),
                    page('Spind-Angebot', 'spind-angebot')
                ]
            ),
            page('Unterricht', 'unterricht', [
                    page('Unsere Schule in Zahlen', 'aktuelle-statistik'),
                    page('Unser Kollegium', 'kollegium'),
                    page('Schulordnung', 'schulordnung'),
                    page('Versetzungsordnung', 'versetzungsordnung'),
                    page('Kopfnoten', 'kopfnoten'),
                    page('Schulbücher und -material', 'schulmaterial'),
                    page('Schulbücherei/Medien', 'schulbuecherei'),
                    page('Schüleraustausch Frankreich', 'schueleraustausch-frankreich'),
                    page('Fahrtenangebote', 'fahrtenangebote'),
                    page('Galerie der Kunst-Klassen', 'galerie-der-kunst-klassen'),
                    page('Stundentafel', 'stundentafel'),
                    page('Lehrpläne', 'curriculum-und-lehrplaene'),
                    page('Schüler helfen Schülern', 'schueler-helfen-schuelern'),
                    page('Ergänzungs- und Förderunterricht', 'ergaenzungs-und-foerderunterricht'),
                    page('Profil-Klassen', 'profilklassen'),
                    page('Schulsozialarbeit', 'schulsozialarbeit'),
                    page('Hilfe bei Lernstörungen', 'hilfe-bei-lernstoerungen'),
                    page('Hochbegabung', 'hochbegabung'),
                    page('Bunter Alltag', 'bunter-alltag')
                ]
            ),
            page('Schul-Laufbahn', 'schullaufbahn', [
                    page('Anmeldung', 'anmeldung2'),
                    page('Sanfter Übergang - Lernen lernen!', 'sanfter-uebergang'),
                    page('Startprojekt Ich/Wir/Eine Welt', 'startprojekt-ich-wir-eine-welt'),
                    page('Erprobungsstufe Klasse 5 und 6', 'erprobungsstufe-klasse-5-und-6'),
                    page('Differenzierung ab Klasse 7', 'differenzierung-ab-klasse-7'),
                    page('Lernstandserhebungen in Klasse 8', 'lernstandserhebungen-in-klasse-8'),
                    page('Praktika', 'praktika'),
                    page('Berufsvorbereitung', 'berufsvorbereitung'),
                    page('Zentrale Prüfungen in Klasse 10', 'zentrale-pruefungen-in-klasse-10'),
                    page('Abschlüsse der Realschule', 'abschluesse-der-realschule')
                ]
            ),
            page('Projekte', 'projekte', [
                    page('Nachhaltigkeit im Schulalltag', 'nachhaltigkeit-im-schulalltag'),
                    page('Schulprofil Gesund lernen', 'schulprofil-gesund-lernen'),
                    page('Nachdenkraum-Projekt', 'nachdenkraum-projekt'),
                    page('Streitschlichter-Projekt', 'streitschlichter-projekt'),
                    page('Gewaltpräventionsprojekt', 'gewaltpraevention'),
                    page('Vorlesewettbewerb', 'vorlesewettbewerb'),
                    page('Big Challenge', 'big-challenge'),
                    page('DELF Zertifikat', 'delf-zertifikat'),
                    page('Känguruh der Mathematik', 'kaenguru-der-mathematik'),
                    page('Sponsorenlauf', 'sponsorenlauf'),
                    page('Togo-Projekt', 'togo-projekt'),
                    page('Sportveranstaltungen', 'sportveranstaltungen')
                ]
            ),
            page('Termine', 'termine'),
            page('Schul-Check', 'schulcheck'),
            page('Eltern', 'eltern', [
                    page('Schulpflegschaft', 'schulpflegschaft'),
                    page('Klassenpflegschaft', 'klassenpflegschaft'),
                    page('Fachkonferenzen', 'fachkonferenzen'),
                    page('Förderverein der Schule', 'foerderverein')
                ]
            ),
            page('Schüler', 'schueler', [
                  page('Wir nehmen Einfluss!', 'wir-nehmen-einfluss'),
                  page('Wir wollen\'s wissen!', 'wir-wollen-es-wissen'),
                  page('Wir können was!', 'wir-koennen-was'),
                  page('Wir sind gut drauf! Meistens...', 'wir-sind-gut-drauf')
                ]
            ),
            page('Lehrer', 'lehrer'),
            page('Wichtige Links und Adressen!', 'adressen', [
                    page('Üben & Lernen', 'ueben-und-lernen'),
                    page('Downloads', 'arbeitsmaterialien-zum-download'),
                    page('Institutionen', 'institutionen'),
                    page('Schulbücher', 'schulbuecher-kaufen'),
                    page('Links zur Ausbildungsplatzsuche', 'links-zur-ausbildungsplatzsuche'),
                    page('Links zur Schule', 'links-rund-um-schule-und-familie')
                ]
            ),
            page('Impressum', 'impressum'),
            page('Haftungsausschluss', 'haftungsausschluss'),
            page('Häufig gestellte Fragen', 'haeufig-gestellte-fragen'),
            page('Archiv', 'archiv') 
        ];
    }
})();
