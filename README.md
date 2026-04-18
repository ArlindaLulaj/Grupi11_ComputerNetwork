# Grupi11_ComputerNetwork
Ky projekt eshte nje aplikacion client-server i zhvilluar ne Node.js duke perdorur protokollin TCP per komunikim ndermjet serverit dhe klienteve.

Serveri funksionon si pika qendrore dhe pranon lidhje nga disa kliente ne rrjet. Klientet mund te dergojne komanda ne forme teksti, ndersa serveri i perpunon ato dhe kthen pergjigje sipas kerkeses.

Komandat kryesore:
- READ <filename> – lexon nje file nga serveri
- WRITE <filename> <text> – shkruan ne file (vetem admin)
- EXECUTE LIST – shfaq listen e file-ve (vetem admin)
- MESSAGE <text> – dergon mesazh te thjeshte
- EXIT – mbyll lidhjen

Projekti perfshin sistem privilegjesh:
- Klienti i pare qe lidhet merr rolin **admin**
- Klientet tjere kane rolin **read-only**

Admin ka qasje te plote (read/write/execute), ndersa klientet read-only mund vetem te lexojne file dhe te dergojne mesazhe.

Ky projekt demonstron komunikimin ne rrjet, menaxhimin e klienteve dhe kontrollin e qasjes ne resurset e serverit.
