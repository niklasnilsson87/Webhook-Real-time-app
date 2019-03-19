# nn222ia-examination-3

##Vad är Urlen till din application?

https://cscloud78.lnu.se/

###Förklara vad du har gjort för att göra applikationen säker både i koden och när du konfigurerar din applications server?

Kodmässigt: Jag har använt mig utav helmet som default. Det innebär att man sätter olika headers som ökar säkerheten för applikationen.
Dessa är:
  
  * DNS Prefetch Control - avaktiverar webbläsarens DNS (förhämtning).
  * Frameguard - förhindrar klick-attacker, Ser till att det som är klickat verkligen tar dig till rätt länk.
  * HidePowerdBy - Döljer vilken plattform servern körs på.
  * HSTS - "Strict-Transport-Security - förhindrar att anslutningen stannar byter protokoll från HTTPS.
  * isNotOpen - förhindrar Internet Explorer (upp till v.8) exikverar HTML från din applikation.
  * noSniff - Låter inte webbläsaren gissa MIME-type på ett dokument. En server kan annars ta emot ett .html dokument som innehåller javascript
  * xssFilter - förhindar exikvering av javascript vid expempelvis input fält. Letar efter script taggar och förhindrar dessa att exikveras.

Jag har använt mig utav helmets Content Security Policy där jag vit-listar mina egna filer och de filer som jag har lagt in på min index sida samt att jag har "blockAllMixedContent"
som ser till att alla filer kommer ifrån en https sida.

På posten till github så har jag använt mig utav en middleware som ser till att jag bara tar emot posts ifrån Github. Jag läser av sha1 signaturen som jag har lagt in som en secret i webhooken och jämför den med min egna signatur för att säkerhetställa att posten inte har manipulerats.

På servern så har jag lagt in att servern ska dölja vilken server som körs med genom att skriva in i conf filen sever-token Off.
Jag har också installerat verktygen [wapiti](http://wapiti.sourceforge.net) som gör en undersökning på olika attacker och visar en rapport som jag inkluderar nedan

![Wapiti Report](./security-report.png)



###Förklara följande, hur du använder dom och till vilket syfte?

reversed proxy
proccess manager
TLS certificates
Enviroment variables

###Vad är skillnaden när du kör din application i produktion gämfört med utveckling?

###Vilka extra moduler har du använt under examinationen? Motivera varför och hur du använt dom och om dom är säkra.

###Har du implementerat några extra features som kan motivera högre betyg?