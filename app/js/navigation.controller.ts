/// <reference path="jquery/jquery.d.ts" />
/// <reference path="angular/angular.d.ts" />

'use strict';

declare function escape (any):any;
declare function unescape (any):any;

class Page {
    constructor(public name: string, public url: string, public children?: Page[]) { 
        this.name = Page.escapeumlaut(name);
        this.url = "./" + url + ".html";
        if (children) {
            this.children = children;
        }  
    }

    static escapeumlaut(name: string) : string {
        // return name.
        //     replace("Ä", "\u00c4").
        //     replace("ä", "\u00e4").
        //     replace("Ö", "\u00d6").
        //     replace("ö", "\u00f6").
        //     replace("Ü", "\u00dc").
        //     replace("ü", "\u00fc").
        //     replace("ß", "\u00df");

        return name.
            replace("Ä", Page.b64_to_utf8("w4Q=")).
            replace("ä", Page.b64_to_utf8("w6Q=")).
            replace("Ö", Page.b64_to_utf8("w5Y=")).
            replace("ö", Page.b64_to_utf8("w7Y=")).
            replace("Ü", Page.b64_to_utf8("w5w=")).
            replace("ü", Page.b64_to_utf8("w7w=")).
            replace("ß", Page.b64_to_utf8("w58="));
    }

    static utf8_to_b64( str : string ) : string {
      return window.btoa(unescape(encodeURIComponent( str )));
    }

    static b64_to_utf8( str : string) : string {
      return decodeURIComponent(escape(window.atob( str )));
    }
}

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
    .controller('Navigation', ['$scope', '$http', '$location', '$anchorScroll', navigation]);

function navigation($scope: any, $http: any, $location: any, $anchorScroll: any) {
    $scope.locationpath = $location.path();
    $scope.locationwindow = window.location.href;
    $scope.data = getNavigationData(".");
    setActiveClassAttribute($scope.data, $scope.locationwindow, ".");

    $scope.scrollTo = function(id) {
        $location.hash(id);
        $anchorScroll();
    }
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

function getNavigationData(baseurl: string) {
    var x = function(name: string, url: string, children?: Page[]): Page {
        return new Page(name, url, children);
    };

    return [
        x('Start', 'index'),
        x('Aktuelles', 'blog'),
        x('Wir stellen uns vor', 'vorstellung', [
            x('Begrüßung', 'begruessung'),
            x('Sprech- und -Bürozeiten', 'sprech-und-buerozeiten'),
            x('Schulische Gremien', 'schulische-gremien'),
            x('Pressespiegel', 'pressespiegel')
        ]),
        x('Anmeldung', 'anmeldung'),
        x('Berufsorientierung', 'berufsorientierung'),
        x('Pädagogik', 'unsere-paedagogik', [
            x('Schulhistorie', 'schulhistorie'),
            x('Das Schulprogramm', 'schulprogramm'),
            x('Das Lehrerraum-Prinzip', 'lehrerraum-prinzip'),
            x('Das 67.5 Minutenraster', 'das-67-5-minuten-raster'),
            x('Qualität - mehr als ein Modewort', 'qualitaet'),
            x('Partner und Patenschaften', 'partner-und-patenschaften'),
            x('Arbeitsgemeinschaften', 'arbeitsgemeinschaften'),
            x('Das Merkheft', 'merkheft') 
        ]),
        x('Rund ums Haus', 'rund-ums-haus', [
            x('Mittagessen und Hausaufgabenbetreuung', 'mittagessen-und-hausaufgabenbetreuung'),
            x('Lage und Anfahrt', 'lage-und-anfahrt'),
            x('Gebäude und Gelände', 'gebaeude-und-gelaende'),
            x('Spind-Angebot', 'spind-angebot')
        ]),
        x('Unterricht', 'unterricht', [
            x('Unsere Schule in Zahlen', 'aktuelle-statistik'),
            x('Unser Kollegium', 'kollegium'),
            x('Schulordnung', 'schulordnung'),
            x('Versetzungsordnung', 'versetzungsordnung'),
            x('Kopfnoten', 'kopfnoten'),
            x('Schulbücher und -material', 'schulmaterial'),
            x('Schulbücherei/Medien', 'schulbuecherei'),
            x('Schüleraustausch Frankreich', 'schueleraustausch-frankreich'),
            x('Fahrtenangebote', 'fahrtenangebote'),
            x('Galerie der Kunst-Klassen', 'galerie-der-kunst-klassen'),
            x('Stundentafel', 'stundentafel'),
            x('Lehrpläne', 'curriculum-und-lehrplaene'),
            x('Schüler helfen Schülern', 'schueler-helfen-schuelern'),
            x('Ergänzungs- und Förderunterricht', 'ergaenzungs-und-foerderunterricht'),
            x('Profil-Klassen', 'profilklassen'),
            x('Schulsozialarbeit', 'schulsozialarbeit'),
            x('Hilfe bei Lernstörungen', 'hilfe-bei-lernstoerungen'),
            x('Hochbegabung', 'hochbegabung'),
            x('Bunter Alltag', 'bunter-alltag')
        ]),
        x('Schul-Laufbahn', 'schullaufbahn', [
            x('Anmeldung', 'anmeldung2'),
            x('Sanfter Übergang - Lernen lernen!', 'sanfter-uebergang'),
            x('Startprojekt Ich/Wir/Eine Welt', 'startprojekt-ich-wir-eine-welt'),
            x('Erprobungsstufe Klasse 5 und 6', 'erprobungsstufe-klasse-5-und-6'),
            x('Differenzierung ab Klasse 7', 'differenzierung-ab-klasse-7'),
            x('Lernstandserhebungen in Klasse 8', 'lernstandserhebungen-in-klasse-8'),
            x('Praktika', 'praktika'),
            x('Berufsvorbereitung', 'berufsvorbereitung'),
            x('Zentrale Prüfungen in Klasse 10', 'zentrale-pruefungen-in-klasse-10'),
            x('Abschlüsse der Realschule', 'abschluesse-der-realschule')
        ]),
        x('Projekte', 'projekte', [
            x('Nachhaltigkeit im Schulalltag', 'nachhaltigkeit-im-schulalltag'),
            x('Schulprofil Gesund lernen', 'schulprofil-gesund-lernen'),
            x('Nachdenkraum-Projekt', 'nachdenkraum-projekt'),
            x('Streitschlichter-Projekt', 'streitschlichter-projekt'),
            x('Gewaltpräventionsprojekt', 'gewaltpraevention'),
            x('Vorlesewettbewerb', 'vorlesewettbewerb'),
            x('Big Challenge', 'big-challenge'),
            x('DELF Zertifikat', 'delf-zertifikat'),
            x('Känguruh der Mathematik', 'kaenguru-der-mathematik'),
            x('Sponsorenlauf', 'sponsorenlauf'),
            x('Togo-Projekt', 'togo-projekt'),
            x('Sportveranstaltungen', 'sportveranstaltungen')
        ]),
        x('Termine', 'termine'),
        x('Schul-Check', 'schulcheck'),
        x('Eltern', 'eltern', [
            x('Schulpflegschaft', 'schulpflegschaft'),
            x('Klassenpflegschaft', 'klassenpflegschaft'),
            x('Fachkonferenzen', 'fachkonferenzen'),
            x('Förderverein der Schule', 'foerderverein')
        ]),
        x('Schüler', 'schueler', [
          x('Wir nehmen Einfluss!', 'wir-nehmen-einfluss'),
          x('Wir wollen\'s wissen!', 'wir-wollen-es-wissen'),
          x('Wir können was!', 'wir-koennen-was'),
          x('Wir sind gut drauf! Meistens...', 'wir-sind-gut-drauf')
        ]),
        x('Lehrer', 'lehrer'),
        x('Wichtige Links und Adressen!', 'adressen', [
            x('Üben & Lernen', 'ueben-und-lernen'),
            x('Downloads', 'arbeitsmaterialien-zum-download'),
            x('Institutionen', 'institutionen'),
            x('Schulbücher', 'schulbuecher-kaufen'),
            x('Links zur Ausbildungsplatzsuche', 'links-zur-ausbildungsplatzsuche'),
            x('Links zur Schule', 'links-rund-um-schule-und-familie')
        ]),
        x('Impressum', 'impressum'),
        x('Haftungsausschluss', 'haftungsausschluss'),
        x('Häufig gestellte Fragen', 'haeufig-gestellte-fragen')
    ];
}
