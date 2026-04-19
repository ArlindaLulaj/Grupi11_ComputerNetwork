# Komandat e Projektit

Ky dokument tregon komandat kryesore per startimin dhe testimin e projektit TCP client-server ne Node.js.

Fillimisht startohet serveri me komanden `node server.js` ose `npm.cmd run start:server`. Serveri duhet te qendroje i hapur gjate gjithe testimit. Pasi serveri starton, ai degjon ne portin `5000` dhe pret lidhje nga klientet.

Per testim lokal, klienti startohet me komanden `node client.js`. Per testim ne rrjet real, klienti startohet duke perdorur IP adresen e serverit dhe portin `5000`, p.sh. `node client.js 172.20.10.2 5000`. IP adresa e serverit gjendet ne kompjuterin ku punon serveri me komanden `ipconfig`, duke marre vleren `IPv4 Address`.

Klienti i pare qe lidhet me serverin merr rolin `admin`, ndersa klientet tjere marrin rolin `read-only`. Admini ka te drejte te perdore komandat `READ`, `WRITE`, `EXECUTE`, `MESSAGE` dhe `EXIT`. Klientet read-only mund te perdorin vetem `READ`, `MESSAGE` dhe `EXIT`; komandat `WRITE` dhe `EXECUTE` refuzohen per ta.
