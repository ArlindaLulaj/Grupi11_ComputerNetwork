# Plani i Testimit

Ky dokument pershkruan menyren se si testohet projekti TCP client-server i zhvilluar ne Node.js.

Qellimi i testimit eshte te vertetohet se serveri mund te pranoje lidhje nga disa kliente, te lexoje mesazhet dhe komandat e tyre, te ktheje pergjigje, si dhe te kontrolloje privilegjet e qasjes ne file.

## Qellimi i testimit

Testimi ka per qellim te vertetoje keto pika:

- Serveri starton me sukses.
- Klientet mund te lidhen me serverin.
- Te pakten 4 kliente mund te lidhen nga pajisje te ndryshme ne te njejtin rrjet real.
- Serveri lexon mesazhet qe dergohen nga klientet.
- Serveri kthen pergjigje te klientet.
- Klientet read-only mund te perdorin komanden READ.
- Klientet read-only nuk mund te perdorin komandat WRITE dhe EXECUTE.
- Nje klient admin mund te perdore READ, WRITE dhe EXECUTE.
- Serveri lejon qasje vetem ne folderin server_files.

## Pajisjet e nevojshme

Per testim ne rrjet real nevojiten:

- 1 kompjuter/laptop per serverin
- Te pakten 4 pajisje per klientet
- Te gjitha pajisjet duhet te jene ne te njejtin rrjet Wi-Fi
- Node.js duhet te jete i instaluar ne pajisjet ku ekzekutohet klienti

