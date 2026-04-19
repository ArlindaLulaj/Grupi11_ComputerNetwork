# Komandat e Projektit

Ky dokument tregon komandat kryesore per startimin dhe testimin e projektit TCP client-server ne Node.js.

Fillimisht startohet serveri me komanden `node server.js` ose `npm.cmd run start:server`. Serveri duhet te qendroje i hapur gjate gjithe testimit. Pasi serveri starton, ai degjon ne portin `5000` dhe pret lidhje nga klientet.

Per testim lokal, klienti startohet me komanden `node client.js`. Per testim ne rrjet real, klienti startohet duke perdorur IP adresen e serverit dhe portin `5000`, p.sh. `node client.js 172.20.10.2 5000`. IP adresa e serverit gjendet ne kompjuterin ku punon serveri me komanden `ipconfig`, duke marre vleren `IPv4 Address`.

Klienti i pare qe lidhet me serverin merr rolin `admin`, ndersa klientet tjere marrin rolin `read-only`. Admini ka te drejte te perdore komandat `READ`, `WRITE`, `EXECUTE`, `MESSAGE` dhe `EXIT`. Klientet read-only mund te perdorin vetem `READ`, `MESSAGE` dhe `EXIT`; komandat `WRITE` dhe `EXECUTE` refuzohen per ta.

Komandat kryesore qe perdoren ne klient jane: `MESSAGE Pershendetje server`, `READ sample.txt`, `WRITE sample.txt Test nga admin`, `EXECUTE LIST` dhe `EXIT`. Komanda `MESSAGE` dergon mesazh tekst te serveri. Komanda `READ sample.txt` lexon file-in `sample.txt` nga folderi `server_files`. Komanda `WRITE sample.txt ...` shkruan ne file, por vetem nese klienti eshte admin. Komanda `EXECUTE LIST` shfaq listen e file-ve ne `server_files`, por vetem per admin. Komanda `EXIT` mbyll lidhjen e klientit me serverin.

Per testim, fillimisht hapet serveri, pastaj hapet klienti i pare si admin dhe testohen komandat `READ sample.txt`, `WRITE sample.txt Test nga admin`, `READ sample.txt` dhe `EXECUTE LIST`. Pastaj hapet nje klient tjeter si read-only dhe testohen `READ sample.txt`, `WRITE sample.txt Test nga read only` dhe `EXECUTE LIST`. Rezultati i pritur eshte qe `READ` te funksionoje per te gjithe, ndersa `WRITE` dhe `EXECUTE` te funksionojne vetem per admin.
