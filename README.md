# Music Web Library Frontend

I. URUCHAMIANIE ŚRODOWISKA DEVELOPERSKIEGO I TESTOWEGO
W celu instalacji i przygotowania aplikacji internetowej do rozwoju i testowania proszę wykonać po kolei I.I, I.II, I.II

I.I BAZA DANYCH
1) Utworzyć nową bazę danych MySQL
2) Zainicjalizować bazę danych danymi początkowymi używając skryptu SQL music-web-library-backend/sql/dump-music-db-init.sql

I.II SERWER
1) Utworzyć i odpowiednio skonfigurować application.properties (music-web-library-backend/src/main/resources/) wzorując się na ustawieniach application.properties.example
2) Skonfigurować w zależności od potrzeb ustawienia w pakiecie com.chrisaraneo.mwl.config
3) Pobrać wszystkie potrzebne zależności i przygotować projekt maven (music-web-library-backend)
4) Uruchomić MusicWebLibraryApplication

I.III INTERNETOWY INTERFEJS
1) Utworzyć i odpowiednio skonfigurować config.ts (music-web-library-frontend/src/) wzorując się na ustawieniach config.example.ts
2) Pobrać wszystkie potrzebne zależności i przygotować projekt yarn (music-web-library-frontend)
3) Po instalacji zależności uruchomić projekt yarn (yarn start)