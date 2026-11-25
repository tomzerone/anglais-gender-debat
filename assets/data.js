/* Contenu du site de révision — Gender quotas in the workplace (Asics London)
   Version courte : l’essentiel seulement, des phrases courtes, chacune avec sa traduction.
   Chiffres vérifiés le 24 novembre 2026 (sources en bas de fichier). */

window.DATA = {

  subject: {
    en: "Your company, Asics (London), wants to set quotas to help women advance. You are discussing the topic with your colleagues.",
    tr: "Ton entreprise, Asics (Londres), veut fixer des quotas pour aider les femmes à progresser. Tu en discutes avec tes collègues."
  },

  /* Le sujet en 30 secondes */
  basics: [
    { en: "A quota is mandatory. A target is voluntary.",
      tr: "Un quota est obligatoire. Un objectif est volontaire." },
    { en: "The glass ceiling is an invisible barrier that keeps women from top jobs.",
      tr: "Le plafond de verre est une barrière invisible qui empêche les femmes d’accéder aux postes les plus élevés." },
    { en: "Asics already has a target. Should it go further, with a quota?",
      tr: "Asics a déjà un objectif. Doit-elle aller plus loin, avec un quota ?" }
  ],

  vocab: [
    { en: "a quota", fr: "un quota (minimum obligatoire)" },
    { en: "a target", fr: "un objectif chiffré (volontaire)" },
    { en: "mandatory", fr: "obligatoire" },
    { en: "voluntary", fr: "volontaire, non obligatoire", cours: true },
    { en: "the glass ceiling", fr: "le plafond de verre", cours: true },
    { en: "the gender pay gap", fr: "l’écart de salaire femmes-hommes", cours: true },
    { en: "the board", fr: "le conseil d’administration", cours: true },
    { en: "a CEO", fr: "un PDG, un directeur général", cours: true },
    { en: "a role model", fr: "un modèle à suivre" },
    { en: "merit", fr: "le mérite" },
    { en: "a token woman", fr: "une « femme alibi »" },
    { en: "positive discrimination", fr: "la discrimination positive" },
    { en: "under-represented", fr: "sous-représenté(e)s" },
    { en: "fair / unfair", fr: "juste / injuste" },
    { en: "to promote", fr: "promouvoir (donner une promotion)" },
    { en: "to back up (an argument)", fr: "appuyer, étayer (un argument)" },
    { en: "to lag behind", fr: "être à la traîne", cours: true },
    { en: "to carry a risk", fr: "comporter un risque", cours: true },
    { en: "to thrive", fr: "s’épanouir, prospérer", cours: true },
    { en: "whopping", fr: "énorme, colossal", cours: true }
  ],

  /* 6 chiffres */

  /* 6 chiffres */
  stats: [
    { id: "asics", side: "both", num: "41", unit: "%",
      label: "Femmes parmi les managers d’Asics dans le monde (fin 2025)",
      say: "At Asics, 41% of managers are women, thanks to a target. But only 20% in Japan.",
      tr: "Chez Asics, 41 % des managers sont des femmes, grâce à un objectif. Mais seulement 20 % au Japon.",
      note: "Utile aux deux camps. En Europe, c’est 42,6 %.",
      src: "ASICS (au 31 décembre 2025)", url: "https://corp.asics.com/en/csr/diversity/promotion" },
    { id: "eu-gap", side: "both", num: "11.1", unit: "%",
      label: "Écart de salaire femmes-hommes dans l’UE (2024)",
      say: "In the EU, women earn 11.1% less per hour than men.",
      tr: "Dans l’UE, les femmes gagnent 11,1 % de moins par heure que les hommes.",
      note: "Le chiffre de ton cours (12,7 % en 2022) a baissé.",
      src: "Eurostat (données 2024)", url: "https://ec.europa.eu/eurostat/statistics-explained/index.php/Gender_pay_gap_statistics" },
    { id: "uk", side: "both", num: "43", unit: "%",
      label: "Femmes dans les conseils d’administration des plus grandes sociétés britanniques (2026)",
      say: "In the biggest UK companies, 43% of board members are women, but only about one CEO in ten.",
      tr: "Dans les plus grandes entreprises britanniques, 43 % des membres des conseils sont des femmes, mais seulement environ une PDG sur dix.",
      note: "Contre : 43 % sans aucune loi. Pour : le sommet reste bloqué.",
      src: "FTSE Women Leaders Review (2026) ; Russell Reynolds (2026)", url: "https://ftsewomenleaders.com/" },
    { id: "eu-quota", side: "pour", num: "40", unit: "%",
      label: "Quota européen dans les conseils d’administration (depuis juin 2026)",
      say: "Since June 2026, big EU companies must have 40% women among their non-executive directors.",
      tr: "Depuis juin 2026, les grandes entreprises de l’UE doivent avoir 40 % de femmes parmi leurs administrateurs non exécutifs.",
      note: "Le Royaume-Uni n’est pas concerné : il a quitté l’UE.",
      src: "Union européenne", url: "https://europa.eu/youreurope/business/running-business/governance/gender-balance-boards/index_en.htm" },
    { id: "wef", side: "pour", num: "120", unit: "years",
      label: "Temps nécessaire pour atteindre l’égalité femmes-hommes dans le monde, au rythme actuel",
      say: "At this speed, the world needs 120 years to reach gender equality.",
      tr: "À ce rythme, il faudra 120 ans au monde pour atteindre l’égalité femmes-hommes.",
      note: "",
      src: "Forum économique mondial (2026)", url: "https://www.weforum.org/publications/global-gender-gap-report-2026/" },
    { id: "mckinsey", side: "both", num: "39", unit: "%",
      label: "« Plus de chances de mieux réussir » pour les entreprises les plus féminisées (McKinsey, 2023)",
      say: "McKinsey: companies with the most women at the top are 39% more likely to do better.",
      tr: "Selon McKinsey, les entreprises qui ont le plus de femmes à leur tête ont 39 % de chances en plus de mieux réussir.",
      note: "Attention : c’est une corrélation, pas une preuve. Le camp contre peut le dire.",
      src: "McKinsey (2023)", url: "https://www.mckinsey.com/featured-insights/diversity-and-inclusion/diversity-matters-even-more-the-case-for-holistic-impact" }
  ],

  /* 6 arguments par camp : une idée + une preuve, deux phrases courtes */
  args: {
    pour: [
      { en: "It’s too slow", fr: "C’est trop lent",
        say: "Without quotas, change is far too slow.", sayTr: "Sans quotas, le changement est beaucoup trop lent.",
        proof: "At this speed, we will need 120 years to reach equality.", proofTr: "À ce rythme, il faudra 120 ans pour atteindre l’égalité.",
        figure: "120 years" },
      { en: "Quotas work", fr: "Les quotas, ça marche",
        say: "Quotas work, and they work fast.", sayTr: "Les quotas marchent, et ils marchent vite.",
        proof: "In Norway, women on boards went from 5% to 40%. France now has 47%.", proofTr: "En Norvège, les femmes dans les conseils sont passées de 5 % à 40 %. La France en a aujourd’hui 47 %.",
        figure: "Norway: 5% → 40%; France: 47%" },
      { en: "Role models", fr: "Des modèles à suivre",
        say: "You can’t be what you can’t see.", sayTr: "On ne peut pas devenir ce qu’on ne voit pas.",
        proof: "In India, girls became more ambitious in villages led by women.", proofTr: "En Inde, les filles sont devenues plus ambitieuses dans les villages dirigés par des femmes.",
        figure: "India: girls more ambitious" },
      { en: "Good for business", fr: "Bon pour le business",
        say: "Mixed teams make better decisions.", sayTr: "Les équipes mixtes prennent de meilleures décisions.",
        proof: "McKinsey: companies with the most women at the top are 39% more likely to do better.", proofTr: "Selon McKinsey, les entreprises qui ont le plus de femmes à leur tête ont 39 % de chances en plus de mieux réussir.",
        figure: "McKinsey: 39%" },
      { en: "The glass ceiling is real", fr: "Le plafond de verre existe",
        say: "Women reach the board, but not the top job.", sayTr: "Les femmes arrivent au conseil, mais pas au poste le plus élevé.",
        proof: "Only about one in ten of the biggest UK companies has a female CEO.", proofTr: "Seulement environ une grande entreprise britannique sur dix a une femme PDG.",
        figure: "1 CEO in 10" },
      { en: "Merit is not neutral", fr: "Le mérite n’est pas neutre",
        say: "Managers often promote people who look like them.", sayTr: "Les managers promeuvent souvent des gens qui leur ressemblent.",
        proof: "For every 100 men promoted to manager, only 93 women are.", proofTr: "Pour 100 hommes promus managers, seulement 93 femmes le sont.",
        figure: "93 women for 100 men" }
    ],
    contre: [
      { en: "Merit first", fr: "Le mérite d’abord",
        say: "The best person should get the job, man or woman.", sayTr: "C’est la meilleure personne qui doit avoir le poste, homme ou femme.",
        proof: "With a quota, people may think she got the job only because she’s a woman.", proofTr: "Avec un quota, les gens risquent de penser qu’elle a eu le poste seulement parce que c’est une femme.",
        figure: "the “token woman”" },
      { en: "It’s illegal in London", fr: "C’est illégal à Londres",
        say: "In the UK, positive discrimination is illegal.", sayTr: "Au Royaume-Uni, la discrimination positive est illégale.",
        proof: "In 2023, a report found that the RAF had illegally discriminated against white men.", proofTr: "En 2023, un rapport a montré que la RAF (l’armée de l’air) avait discriminé illégalement des hommes blancs.",
        figure: "Equality Act 2010; the RAF (2023)" },
      { en: "Targets already work", fr: "Les objectifs marchent déjà",
        say: "We don’t need to force it.", sayTr: "Pas besoin de forcer.",
        proof: "With no law, UK boards went from 9.5% to 43% women. At Asics, 41% of managers are women.", proofTr: "Sans loi, les conseils britanniques sont passés de 9,5 % à 43 % de femmes. Chez Asics, 41 % des managers sont des femmes.",
        figure: "UK: 9.5% → 43%; Asics: 41%" },
      { en: "It only helps an elite", fr: "Ça n’aide qu’une élite",
        say: "Quotas help a few women at the top, not the others.", sayTr: "Les quotas aident quelques femmes au sommet, pas les autres.",
        proof: "In Norway, about 70 “golden skirts” took many board seats.", proofTr: "En Norvège, environ 70 « golden skirts » (jupes dorées) ont cumulé de nombreux sièges.",
        figure: "Norway: about 70 “golden skirts”" },
      { en: "The real problem is motherhood", fr: "Le vrai problème, c’est la maternité",
        say: "We need better childcare, not quotas.", sayTr: "Il faut de meilleures solutions de garde, pas des quotas.",
        proof: "Even in Denmark, women earn about 20% less after their first child.", proofTr: "Même au Danemark, les femmes gagnent environ 20 % de moins après leur premier enfant.",
        figure: "−20% after a first child" },
      { en: "There is no real proof", fr: "Il n’y a pas de vraie preuve",
        say: "There’s no clear proof that quotas make companies better.", sayTr: "Il n’y a pas de preuve claire que les quotas rendent les entreprises meilleures.",
        proof: "McKinsey’s famous 39% is a correlation, not a proof.", proofTr: "Le fameux 39 % de McKinsey est une corrélation, pas une preuve.",
        figure: "39% = a correlation" }
    ]
  },

  openings: {
    pour: {
      en: "I think Asics should set quotas. Without them, change is too slow: we would wait 120 years. And quotas work: look at Norway.",
      tr: "Je pense qu’Asics devrait fixer des quotas. Sans eux, le changement est trop lent : on attendrait 120 ans. Et les quotas marchent : regardez la Norvège."
    },
    contre: {
      en: "I want more women at the top, but quotas are the wrong tool. In London, positive discrimination is illegal. And targets already work: 41% of our managers are women.",
      tr: "Je veux plus de femmes au sommet, mais les quotas sont le mauvais outil. À Londres, la discrimination positive est illégale. Et les objectifs marchent déjà : 41 % de nos managers sont des femmes."
    }
  },

  closings: {
    pour: {
      en: "To sum up, quotas are fast and they work. That’s why I support them.",
      tr: "Pour résumer, les quotas sont rapides et ils marchent. C’est pourquoi je les soutiens."
    },
    contre: {
      en: "All in all, I share the goal, but not the method. Let’s set targets, not quotas.",
      tr: "Au final, je partage l’objectif, mais pas la méthode. Fixons des objectifs, pas des quotas."
    }
  },

  middle: {
    en: "What about a middle ground? Clear targets now, and quotas only if we miss them in three years.",
    tr: "Et si on trouvait un juste milieu ? Des objectifs clairs maintenant, et des quotas seulement si on les rate dans trois ans."
  },

  /* 3 exemples hors du travail (la prof l’a demandé) */
  beyond: [
    { side: "both", title: "France: the parity law",
      en: "In France, a parity law took women MPs from 11% in 1997 to 39% in 2017.",
      tr: "En France, une loi sur la parité a fait passer les députées de 11 % en 1997 à 39 % en 2017.",
      use: "Pour : la loi a marché. Contre : certains partis préfèrent payer l’amende." },
    { side: "both", title: "Paris 2024: the first 50/50 Olympics",
      en: "Paris 2024 had as many women as men athletes, thanks to a quota. But only 13% of the coaches were women.",
      tr: "À Paris 2024, il y avait autant d’athlètes femmes que d’hommes, grâce à un quota. Mais seulement 13 % des entraîneurs étaient des femmes.",
      use: "Pour : le quota a marché. Contre : il n’a rien changé ailleurs." },
    { side: "pour", title: "Rwanda: a world record",
      en: "In Rwanda, quotas are in the Constitution: a whopping 64% of MPs are women.",
      tr: "Au Rwanda, les quotas sont dans la Constitution : 64 % des députés sont des femmes, un chiffre énorme.",
      use: "Pour : avec des quotas, les femmes arrivent au pouvoir." }
  ],

  phrases: [
    { en: "In my opinion, …", tr: "À mon avis, …" },
    { en: "I see your point, but …", tr: "Je comprends ton point de vue, mais …" },
    { en: "I’m afraid I disagree.", tr: "Je regrette, mais je ne suis pas d’accord." },
    { en: "Sorry to interrupt, but …", tr: "Désolé de t’interrompre, mais …" },
    { en: "Do you have any figures to back that up?", tr: "Tu as des chiffres pour appuyer ça ?" },
    { en: "Take Norway, for example.", tr: "Prenons l’exemple de la Norvège." },
    { en: "Let me think about that for a second.", tr: "Laisse-moi réfléchir une seconde." },
    { en: "What do you think, Emma?", tr: "Qu’est-ce que tu en penses, Emma ?" },
    { en: "What about a middle ground?", tr: "Et si on trouvait un juste milieu ?" },
    { en: "To sum up, …", tr: "Pour résumer, …" }
  ],

  /* 5 pièges */
  traps: [
    { wrong: "I am agree.", right: "I agree.", note: "« Agree » est un verbe : pas de « am »." },
    { wrong: "According to me, …", right: "In my opinion, …", note: "« According to » sert pour une source : according to Eurostat." },
    { wrong: "Actually, the gap is 11%. (= actuellement)", right: "Currently, the gap is 11%.", note: "« Actually » veut dire « en fait »." },
    { wrong: "Eleven comma one per cent", right: "Eleven point one per cent", note: "En anglais, un point, jamais une virgule : 11.1%." },
    { wrong: "The women earn less than the men.", right: "Women earn less than men.", note: "Pas de « the » pour parler des femmes en général." }
  ],
  pronunciation: "Women se prononce « WI-min » (et woman, « WOU-man »). C’est la faute qu’on entend le plus.",

  /* Simulateur : 6 répliques par camp */
  people: {
    james: { name: "James", role: "Head of Finance" },
    oliver: { name: "Oliver", role: "Store Manager" },
    emma: { name: "Emma", role: "HR Director" },
    priya: { name: "Priya", role: "Marketing Manager" }
  },


  sim: {
    vsPour: [
      { id: "sp1", who: "james", en: "Quotas are unfair to men. The best person should get the job.",
        tr: "Les quotas sont injustes pour les hommes. C’est le meilleur qui doit avoir le poste.",
        answer: "I agree, but managers often promote people like them. A quota just makes us look harder.",
        answerTr: "Je suis d’accord, mais les managers promeuvent souvent des gens qui leur ressemblent. Un quota nous oblige juste à chercher mieux." },
      { id: "sp2", who: "oliver", en: "Women promoted with a quota will be seen as token women.",
        tr: "Les femmes promues grâce à un quota seront vues comme des femmes alibis.",
        answer: "When boards were 95% male, nobody talked about token men.",
        answerTr: "Quand les conseils étaient masculins à 95 %, personne ne parlait d’hommes alibis." },
      { id: "sp3", who: "james", en: "The UK reached 43% women on boards without quotas. Why change?",
        tr: "Le Royaume-Uni a atteint 43 % de femmes dans les conseils sans quotas. Pourquoi changer ?",
        answer: "Because only about one in ten of the biggest companies has a female CEO.",
        answerTr: "Parce que seulement environ une grande entreprise sur dix a une femme PDG." },
      { id: "sp4", who: "oliver", en: "Quotas are illegal in the UK.",
        tr: "Les quotas sont illégaux au Royaume-Uni.",
        answer: "Positive discrimination is, yes. But targets and mentoring are legal, so let’s use them.",
        answerTr: "La discrimination positive, oui. Mais les objectifs et le mentorat sont légaux, alors utilisons-les." },
      { id: "sp5", who: "james", en: "There’s no proof that more women make a company more profitable.",
        tr: "Rien ne prouve que plus de femmes rendent une entreprise plus rentable.",
        answer: "There’s no proof it hurts either. And McKinsey says these companies are 39% more likely to do better.",
        answerTr: "Rien ne prouve que ça nuit non plus. Et selon McKinsey, ces entreprises ont 39 % de chances en plus de mieux réussir." },
      { id: "sp6", who: "oliver", en: "Women don’t want these top jobs. It’s their choice.",
        tr: "Les femmes ne veulent pas de ces postes. C’est leur choix.",
        answer: "It’s not a choice: for 100 men promoted to manager, only 93 women are.",
        answerTr: "Ce n’est pas un choix : pour 100 hommes promus managers, seulement 93 femmes le sont." }
    ],
    vsContre: [
      { id: "sc1", who: "emma", en: "Voluntary measures don’t work. We’ll wait 120 years!",
        tr: "Les mesures volontaires ne marchent pas. On va attendre 120 ans !",
        answer: "They work when they’re serious: the UK went from 9.5% to 43% without a law.",
        answerTr: "Elles marchent quand elles sont sérieuses : le Royaume-Uni est passé de 9,5 % à 43 % sans loi." },
      { id: "sc2", who: "priya", en: "Quotas work: look at Norway and France.",
        tr: "Les quotas marchent : regarde la Norvège et la France.",
        answer: "They mostly helped a small elite: the “golden skirts” in Norway.",
        answerTr: "Ils ont surtout aidé une petite élite : les « golden skirts » en Norvège." },
      { id: "sc3", who: "emma", en: "Diverse companies are 39% more likely to do better.",
        tr: "Les entreprises diverses ont 39 % de chances en plus de mieux réussir.",
        answer: "That’s a correlation, not a proof. Other researchers didn’t find the same result.",
        answerTr: "C’est une corrélation, pas une preuve. D’autres chercheurs n’ont pas trouvé le même résultat." },
      { id: "sc4", who: "priya", en: "Girls need role models. Quotas create them.",
        tr: "Les filles ont besoin de modèles. Les quotas en créent.",
        answer: "A role model is strong because she earned her place, not because of a quota.",
        answerTr: "Un modèle est fort parce qu’elle a mérité sa place, pas grâce à un quota." },
      { id: "sc5", who: "emma", en: "The pay gap is still 11% in the EU.",
        tr: "L’écart de salaire est encore de 11 % dans l’UE.",
        answer: "It’s falling, and the real cause is motherhood. We need better childcare, not quotas.",
        answerTr: "Il baisse, et la vraie cause, c’est la maternité. Il faut de meilleures solutions de garde, pas des quotas." },
      { id: "sc6", who: "priya", en: "In Japan, only 20% of our managers are women. We need a quota!",
        tr: "Au Japon, seulement 20 % de nos managers sont des femmes. Il faut un quota !",
        answer: "True, but in Europe it’s already 42.6%. Each region needs its own plan.",
        answerTr: "C’est vrai, mais en Europe c’est déjà 42,6 %. Chaque région a besoin de son propre plan." }
    ]
  },

  /* Quiz : la bonne réponse est la première (mélangée à l’écran) */
  quiz: [
    { q: "Quel était l’écart de salaire femmes-hommes dans l’UE en 2024 ?", o: ["11.1%", "1.1%", "21%", "35%"], x: "11,1 %, le plus bas jamais mesuré (ton cours disait 12,7 % en 2022)." },
    { q: "Dans les plus grandes entreprises britanniques, quelle part des sièges des conseils d’administration est occupée par des femmes ?", o: ["43%", "13%", "27%", "60%"], x: "43 %, sans loi, grâce à des objectifs volontaires." },
    { q: "Parmi les 100 plus grandes entreprises britanniques, combien sont dirigées par une femme ?", o: ["Environ 1 sur 10", "Environ 1 sur 4", "Environ 4 sur 10", "La moitié"], x: "Environ 10 sur 100 : le plafond de verre au sommet." },
    { q: "Depuis juin 2026, les grandes sociétés cotées de l’UE doivent avoir au moins … de femmes parmi leurs administrateurs non exécutifs.", o: ["40%", "20%", "50%", "10%"], x: "40 % : c’est la directive européenne « Women on Boards »." },
    { q: "Au rythme actuel, combien de temps faudra-t-il pour atteindre l’égalité femmes-hommes dans le monde ?", o: ["120 ans", "12 ans", "50 ans", "500 ans"], x: "120 ans, selon le Forum économique mondial (2026)." },
    { q: "Chez Asics, quelle part des managers dans le monde sont des femmes ?", o: ["41%", "12%", "25%", "62%"], x: "41 %, grâce à un objectif. Mais seulement 20 % au siège, au Japon." },
    { q: "Quel pays a été le premier à imposer un quota de femmes dans les conseils d’administration (2003) ?", o: ["La Norvège", "La France", "Le Royaume-Uni", "Le Japon"], x: "La Norvège : de 5 % à 40 % de femmes dans les conseils." },
    { q: "Au Royaume-Uni, la « positive discrimination » est…", o: ["illégale", "obligatoire pour les grandes entreprises", "autorisée partout", "illégale seulement en Écosse"], x: "Interdite par l’Equality Act de 2010. Encourager les femmes reste autorisé." },
    { q: "« To lag behind » veut dire…", o: ["être à la traîne", "prendre de l’avance", "faire marche arrière", "attendre quelqu’un"], x: "Vocabulaire du cours : Germany has lagged behind other nations." },
    { q: "« A token woman », c’est…", o: ["une « femme alibi »", "une femme PDG", "une femme très qualifiée", "une salariée à temps partiel"], x: "Le risque mis en avant par le camp contre." },
    { q: "Comment dit-on « 11,1 % » en anglais ?", o: ["eleven point one per cent", "eleven comma one per cent", "eleven and one per cent", "eleven dot one percents"], x: "En anglais, on dit « point », jamais « comma »." },
    { q: "Corrige : « I am agree with you. »", o: ["I agree with you.", "I am agreed with you.", "I am agree to you.", "I agreeing with you."], x: "« Agree » est un verbe : pas de « am »." },
    { q: "Qu’ont eu de spécial les JO de Paris 2024 ?", o: ["Autant d’athlètes femmes que d’hommes", "Autant d’entraîneuses que d’entraîneurs", "Aucune épreuve mixte", "Un quota de 30 % de femmes"], x: "50/50 grâce aux places attribuées. Mais seulement 13 % d’entraîneuses." },
    { q: "Pourquoi le chiffre de McKinsey (« 39 % ») est-il discuté ?", o: ["C’est une corrélation, pas une preuve", "Il date de 1990", "Il concerne seulement le Japon", "Il a été inventé par Asics"], x: "D’autres chercheurs n’ont pas réussi à reproduire ces résultats." },
    { q: "« To thrive » veut dire…", o: ["s’épanouir, prospérer", "avoir soif", "se battre", "abandonner"], x: "Vocabulaire du cours (thrive, throve, thriven)." },
    { q: "Quelle phrase permet de ne pas être d’accord poliment ?", o: ["I see your point, but …", "You are wrong.", "Stop talking.", "That’s stupid."], x: "On reconnaît l’argument de l’autre, puis on nuance." }
  ],

  sources: [
    { t: "ASICS — objectifs de diversité (au 31 décembre 2025)", u: "https://corp.asics.com/en/csr/diversity/promotion" },
    { t: "Eurostat — Gender pay gap statistics", u: "https://ec.europa.eu/eurostat/statistics-explained/index.php/Gender_pay_gap_statistics" },
    { t: "FTSE Women Leaders Review (février 2026)", u: "https://ftsewomenleaders.com/" },
    { t: "Russell Reynolds — femmes PDG du FTSE 100 (janvier 2026)", u: "https://www.russellreynolds.com/en/about/newsroom/number-of-women-ceos-in-ftse-100-at-same-level-as-4-years-ago" },
    { t: "Union européenne — quotas dans les conseils d’administration", u: "https://europa.eu/youreurope/business/running-business/governance/gender-balance-boards/index_en.htm" },
    { t: "Forum économique mondial — Global Gender Gap Report 2026", u: "https://www.weforum.org/publications/global-gender-gap-report-2026/" },
    { t: "McKinsey — Diversity Matters Even More (2023)", u: "https://www.mckinsey.com/featured-insights/diversity-and-inclusion/diversity-matters-even-more-the-case-for-holistic-impact" },
    { t: "deutschland.de — femmes dans les comités de direction du DAX", u: "https://www.deutschland.de/en/news/more-women-on-the-management-boards-of-dax-companies" },
    { t: "Science (2012) — quotas dans les villages indiens", u: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3394179" },
    { t: "EIGE — fiche France 2025", u: "https://eige.europa.eu/modules/custom/eige_gei/app/content/downloads/factsheets/FR_2025_factsheet.pdf" },
    { t: "DREETS — loi Rixain", u: "https://normandie.dreets.gouv.fr/Site-Representation-equilibree-F-H-dans-les-postes-de-direction-des-grandes" },
    { t: "Marie Claire UK — les « golden skirts » norvégiennes", u: "https://marieclaire.co.uk/life/work/norwegian-female-boardroom-pioneer-says-women-don-t-need-enforced-quotas-to-break-the-glass-ceiling-131149" },
    { t: "GOV.UK — positive action au travail", u: "https://www.gov.uk/government/publications/positive-action-in-the-workplace-guidance-for-employers/positive-action-in-the-workplace" },
    { t: "LBC — rapport sur la RAF (2023)", u: "https://lbc.co.uk/news/royal-air-force-illegally-discriminated-white-men" },
    { t: "Kleven, Landais & Søgaard — pénalité de la maternité (Danemark)", u: "https://econ.lse.ac.uk/staff/clandais/cgi-bin/Articles/GenderGap_AEJ-Applied_Final.pdf" },
    { t: "McKinsey & LeanIn — Women in the Workplace 2025", u: "https://www.mckinsey.com/featured-insights/diversity-and-inclusion/women-in-the-workplace" },
    { t: "Vie publique — la parité politique", u: "https://www.vie-publique.fr/eclairage/19618-la-parite-politique" },
    { t: "CIO — égalité femmes-hommes à Paris 2024", u: "https://www.olympics.com/ioc/esr/esr-gender-equality-and-inclusion" },
    { t: "Union interparlementaire — les femmes au parlement (2026)", u: "https://www.ipu.org/news/press-releases/2026-03/womens-representation-in-parliament-sees-sluggish-gains" }
  ]
};
