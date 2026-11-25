/* Contenu du site de révision — Gender quotas in the workplace (Asics London)
   Version courte : l’essentiel seulement, chaque phrase anglaise avec sa traduction.
   Chiffres vérifiés le 24 novembre 2026 (sources en bas de fichier). */

window.DATA = {

  subject: {
    en: "Your company, Asics (London), wants to set quotas to help women advance. You are discussing the topic with your colleagues.",
    tr: "Ton entreprise, Asics (Londres), veut fixer des quotas pour aider les femmes à progresser. Tu en discutes avec tes collègues."
  },

  /* Le sujet en 30 secondes */
  basics: [
    { en: "A quota is mandatory: for example, at least 40% women on the board. A target is voluntary: the company aims for a number, with no sanction.",
      tr: "Un quota est obligatoire : par exemple, au moins 40 % de femmes au conseil d’administration. Un objectif est volontaire : l’entreprise vise un chiffre, sans sanction." },
    { en: "The glass ceiling is an invisible barrier that stops women from reaching the top jobs, even when they have the skills.",
      tr: "Le plafond de verre est une barrière invisible qui empêche les femmes d’atteindre les postes les plus élevés, même quand elles ont les compétences." },
    { en: "Asics already has a target, and it worked: 41% of its managers are women. The question is: should Asics go further, with a quota?",
      tr: "Asics a déjà un objectif, et il a marché : 41 % de ses managers sont des femmes. La question : Asics doit-elle aller plus loin, avec un quota ?" }
  ],

  /* 20 mots — cours = donné par la prof */
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
  stats: [
    { id: "asics", side: "both", num: "41", unit: "%",
      label: "Femmes parmi les managers d’Asics dans le monde (fin 2025)",
      say: "At Asics, 41% of managers worldwide are women, thanks to a target, not a quota. But at our headquarters in Japan, it’s only 20%.",
      tr: "Chez Asics, 41 % des managers dans le monde sont des femmes, grâce à un objectif, pas à un quota. Mais au siège, au Japon, c’est seulement 20 %.",
      note: "Utile aux deux camps. En Europe, c’est 42,6 %.",
      src: "ASICS (au 31 décembre 2025)", url: "https://corp.asics.com/en/csr/diversity/promotion" },
    { id: "eu-gap", side: "both", num: "11.1", unit: "%",
      label: "Écart de salaire femmes-hommes dans l’UE (2024)",
      say: "In the EU, women earn 11.1% less per hour than men.",
      tr: "Dans l’UE, les femmes gagnent 11,1 % de moins par heure que les hommes.",
      note: "Le chiffre de ton cours (12,7 % en 2022) a baissé : c’est le plus bas jamais mesuré.",
      src: "Eurostat (données 2024)", url: "https://ec.europa.eu/eurostat/statistics-explained/index.php/Gender_pay_gap_statistics" },
    { id: "uk", side: "both", num: "43", unit: "%",
      label: "Femmes dans les conseils d’administration des plus grandes sociétés britanniques (2026)",
      say: "In the UK’s biggest companies, 43% of board members are women, without any quota law. But only about one in ten CEOs is a woman.",
      tr: "Dans les plus grandes entreprises britanniques, 43 % des membres des conseils d’administration sont des femmes, sans aucune loi sur les quotas. Mais seulement environ une PDG sur dix.",
      note: "Contre : le volontariat marche (9,5 % en 2011). Pour : le sommet reste bloqué.",
      src: "FTSE Women Leaders Review (2026) ; Russell Reynolds (2026)", url: "https://ftsewomenleaders.com/" },
    { id: "eu-quota", side: "pour", num: "40", unit: "%",
      label: "Quota européen dans les conseils d’administration (depuis juin 2026)",
      say: "Since June 2026, big listed companies in the EU must have at least 40% women among their non-executive directors.",
      tr: "Depuis juin 2026, les grandes entreprises cotées de l’UE doivent compter au moins 40 % de femmes parmi leurs administrateurs non exécutifs.",
      note: "La Norvège a été la première, en 2003. Le Royaume-Uni n’est pas concerné, il a quitté l’UE.",
      src: "Union européenne", url: "https://europa.eu/youreurope/business/running-business/governance/gender-balance-boards/index_en.htm" },
    { id: "wef", side: "pour", num: "120", unit: "years",
      label: "Temps nécessaire pour atteindre l’égalité femmes-hommes dans le monde, au rythme actuel",
      say: "At the current speed, the world will need 120 years to reach gender equality.",
      tr: "Au rythme actuel, il faudra 120 ans au monde pour atteindre l’égalité femmes-hommes.",
      note: "",
      src: "Forum économique mondial (2026)", url: "https://www.weforum.org/publications/global-gender-gap-report-2026/" },
    { id: "mckinsey", side: "both", num: "39", unit: "%",
      label: "« Plus de chances d’être plus performantes » pour les entreprises les plus féminisées (McKinsey, 2023)",
      say: "According to McKinsey, companies with the most women in their top team are 39% more likely to outperform the others.",
      tr: "Selon McKinsey, les entreprises qui ont le plus de femmes à leur tête ont 39 % de chances en plus d’être plus performantes que les autres.",
      note: "Attention : c’est une corrélation, pas une preuve. Le camp contre peut le dire.",
      src: "McKinsey (2023)", url: "https://www.mckinsey.com/featured-insights/diversity-and-inclusion/diversity-matters-even-more-the-case-for-holistic-impact" }
  ],

  /* 3 arguments par camp */
  args: {
    pour: [
      { id: "p1", en: "Without quotas, it’s too slow", fr: "Sans quotas, c’est trop lent",
        say: "We have waited for decades. At the current speed, we will need 120 years to reach gender equality. Quotas speed things up.",
        sayTr: "On attend depuis des décennies. Au rythme actuel, il faudra 120 ans pour atteindre l’égalité. Les quotas accélèrent les choses.",
        proof: "Look at Germany. Voluntary measures failed, so Germany introduced quotas. Since 2020, the share of women on the executive boards of its biggest companies has almost doubled, from 13% to 25%.",
        proofTr: "Regarde l’Allemagne. Les mesures volontaires ont échoué, alors l’Allemagne a instauré des quotas. Depuis 2020, la part de femmes dans les comités de direction de ses plus grandes entreprises a presque doublé, de 13 % à 25 %.",
        theySay: "The UK reached 43% women on boards without quotas.",
        theySayTr: "Le Royaume-Uni a atteint 43 % de femmes dans les conseils sans quotas.",
        answer: "Yes, but only about one in ten of the biggest UK companies has a female CEO. The glass ceiling is still there.",
        answerTr: "Oui, mais seulement environ une grande entreprise britannique sur dix a une femme PDG. Le plafond de verre est toujours là.",
        figure: "120 years; Germany: 13% → 25%" },
      { id: "p2", en: "Quotas create role models", fr: "Les quotas créent des modèles",
        say: "You can’t be what you can’t see. When young women see women at the top, they believe they can do it too.",
        sayTr: "On ne peut pas devenir ce qu’on ne voit pas. Quand les jeunes femmes voient des femmes au sommet, elles pensent qu’elles peuvent y arriver aussi.",
        proof: "In India, a third of village councils must be led by a woman. In these villages, girls became more ambitious and caught up with boys at school.",
        proofTr: "En Inde, un tiers des conseils de village doivent être dirigés par une femme. Dans ces villages, les filles sont devenues plus ambitieuses et ont rattrapé les garçons à l’école.",
        theySay: "Women don’t need quotas. They can succeed on their own.",
        theySayTr: "Les femmes n’ont pas besoin de quotas. Elles peuvent réussir seules.",
        answer: "Of course they have the talent. The problem is not talent, it’s opportunity. A quota gives them a chance.",
        answerTr: "Bien sûr qu’elles ont le talent. Le problème, ce n’est pas le talent, ce sont les opportunités. Un quota leur donne une chance.",
        figure: "India: girls became more ambitious" },
      { id: "p3", en: "Quotas work", fr: "Les quotas, ça marche",
        say: "Quotas have been tested, and they work. Norway went from 5% to 40% women on boards. France now has 47%, the best result in the EU.",
        sayTr: "Les quotas ont été testés, et ils fonctionnent. La Norvège est passée de 5 % à 40 % de femmes dans les conseils. La France en a aujourd’hui 47 %, le meilleur résultat de l’UE.",
        proof: "That’s why the whole EU does the same now: since June 2026, big companies must have 40% women among their non-executive directors. And companies did not collapse!",
        proofTr: "C’est pour ça que toute l’UE fait pareil maintenant : depuis juin 2026, les grandes entreprises doivent avoir 40 % de femmes parmi leurs administrateurs non exécutifs. Et les entreprises ne se sont pas effondrées !",
        theySay: "In Norway, the quota only helped a small elite.",
        theySayTr: "En Norvège, le quota n’a aidé qu’une petite élite.",
        answer: "It’s a first step. That’s why France went further, with a quota for top managers since March 2026.",
        answerTr: "C’est une première étape. C’est pour ça que la France est allée plus loin, avec un quota pour les cadres dirigeants depuis mars 2026.",
        figure: "Norway 5% → 40%; France 47%; EU 40%" }
    ],
    contre: [
      { id: "c1", en: "Merit first: no “token women”", fr: "Le mérite d’abord : pas de « femme alibi »",
        say: "I want the best person for the job, man or woman. With a quota, people may think: “She got the job only because she’s a woman.” That’s unfair to her.",
        sayTr: "Je veux la meilleure personne pour le poste, homme ou femme. Avec un quota, les gens risquent de penser : « Elle a eu le poste seulement parce que c’est une femme. » C’est injuste pour elle.",
        proof: "In Norway, the quota created the “golden skirts”: a small group of about 70 women who sat on many boards at the same time.",
        proofTr: "En Norvège, le quota a créé les « golden skirts » (les jupes dorées) : un petit groupe d’environ 70 femmes qui siégeaient dans de nombreux conseils en même temps.",
        theySay: "Managers are biased. Merit is a myth.",
        theySayTr: "Les managers ont des biais. Le mérite est un mythe.",
        answer: "Then let’s fix the bias, not the result: anonymous CVs and clear rules for promotions.",
        answerTr: "Alors corrigeons les biais, pas le résultat : des CV anonymes et des règles claires pour les promotions.",
        figure: "Norway: about 70 “golden skirts”" },
      { id: "c2", en: "In London, it’s illegal", fr: "À Londres, c’est illégal",
        say: "We are in London. Under the Equality Act 2010, positive discrimination is illegal. We can encourage women, but we can’t choose a less qualified person because of her gender.",
        sayTr: "Nous sommes à Londres. Selon l’Equality Act de 2010, la discrimination positive est illégale. On peut encourager les femmes, mais on ne peut pas choisir une personne moins qualifiée à cause de son genre.",
        proof: "In 2023, an official report found that the Royal Air Force had illegally discriminated against white men to reach its diversity targets. A quota carries a real legal risk.",
        proofTr: "En 2023, un rapport officiel a montré que la Royal Air Force (l’armée de l’air britannique) avait discriminé illégalement des hommes blancs pour atteindre ses objectifs de diversité. Un quota comporte un vrai risque juridique.",
        theySay: "But political parties use all-women shortlists.",
        theySayTr: "Mais les partis politiques utilisent des listes 100 % féminines.",
        answer: "Only because Parliament passed a special law for them. It doesn’t apply to companies like Asics.",
        answerTr: "Seulement parce que le Parlement a voté une loi spéciale pour eux. Elle ne s’applique pas aux entreprises comme Asics.",
        figure: "Equality Act 2010; the RAF case (2023)" },
      { id: "c3", en: "Targets already work", fr: "Les objectifs volontaires marchent déjà",
        say: "We don’t need to force it. Without any law, the UK went from 9.5% to 43% women on the boards of its biggest companies. And at Asics, 41% of our managers are women, thanks to a target, not a quota.",
        sayTr: "Pas besoin de forcer. Sans aucune loi, le Royaume-Uni est passé de 9,5 % à 43 % de femmes dans les conseils de ses plus grandes entreprises. Et chez Asics, 41 % de nos managers sont des femmes, grâce à un objectif, pas à un quota.",
        proof: "The real problem is elsewhere: even in Denmark, having a first child cuts women’s earnings by about 20% compared with men. Better childcare and parental leave would help more women than a quota.",
        proofTr: "Le vrai problème est ailleurs : même au Danemark, avoir un premier enfant fait baisser les revenus des femmes d’environ 20 % par rapport aux hommes. De meilleures solutions de garde et de congé parental aideraient plus de femmes qu’un quota.",
        theySay: "But only about one in ten of the biggest UK companies has a female CEO!",
        theySayTr: "Mais seulement environ une grande entreprise britannique sur dix a une femme PDG !",
        answer: "CEOs come from senior management. Now that there are many more women managers, more women CEOs will follow.",
        answerTr: "Les PDG viennent des cadres dirigeants. Maintenant qu’il y a beaucoup plus de femmes managers, plus de femmes PDG vont suivre.",
        figure: "UK: 9.5% → 43% with no law; Asics: 41%" }
    ]
  },

  openings: {
    pour: {
      en: "Thank you. Asics comes from a Latin phrase: “a sound mind in a sound body”. I think a sound company needs balance too. Today, only about one in ten of the biggest UK companies is run by a woman, and at this speed, we will need 120 years to reach equality. So, in my opinion, quotas are the fastest way to break the glass ceiling.",
      tr: "Merci. Asics vient d’une expression latine : « un esprit sain dans un corps sain ». Je pense qu’une entreprise saine a aussi besoin d’équilibre. Aujourd’hui, seulement environ une grande entreprise britannique sur dix est dirigée par une femme, et à ce rythme, il faudra 120 ans pour atteindre l’égalité. Donc, à mon avis, les quotas sont le moyen le plus rapide de briser le plafond de verre."
    },
    contre: {
      en: "Thank you. Let me be clear: I want more women at the top of Asics. The question is how. I think quotas are the wrong tool: here in London, positive discrimination is illegal, quotas can create “token women”, and targets already work: 41% of Asics managers are women. So I’m in favour of targets, not quotas.",
      tr: "Merci. Soyons clairs : je veux plus de femmes à la tête d’Asics. La question, c’est comment. Je pense que les quotas sont le mauvais outil : ici à Londres, la discrimination positive est illégale, les quotas peuvent créer des « femmes alibis », et les objectifs marchent déjà : 41 % des managers d’Asics sont des femmes. Donc je suis pour des objectifs, pas pour des quotas."
    }
  },

  closings: {
    pour: {
      en: "To sum up: without quotas, change is too slow. With quotas, it works, in Norway, in France and now in the whole EU. That’s why I support quotas at Asics.",
      tr: "Pour résumer : sans quotas, le changement est trop lent. Avec des quotas, ça marche, en Norvège, en France et maintenant dans toute l’UE. C’est pourquoi je soutiens les quotas chez Asics."
    },
    contre: {
      en: "All in all, I share the goal, but not the method. Quotas carry a legal risk in London and can hurt women’s credibility. Let’s set ambitious targets and help parents. That’s how Asics will thrive.",
      tr: "Au final, je partage l’objectif, mais pas la méthode. Les quotas comportent un risque juridique à Londres et peuvent nuire à la crédibilité des femmes. Fixons des objectifs ambitieux et aidons les parents. C’est comme ça qu’Asics va prospérer."
    }
  },

  middle: {
    en: "What about a middle ground? Let’s set clear targets, publish our figures every year, and make sure every shortlist includes at least one qualified woman. If we miss the targets in three years, then we can talk about quotas.",
    tr: "Et si on trouvait un juste milieu ? Fixons des objectifs clairs, publions nos chiffres chaque année, et assurons-nous que chaque liste finale de candidats compte au moins une femme qualifiée. Si on rate les objectifs dans trois ans, alors on pourra parler de quotas."
  },

  /* 3 exemples hors du travail (la prof l’a demandé) */
  beyond: [
    { theme: "Politique", side: "both", title: "France: the parity law (2000)",
      en: "In France, a parity law forces political parties to present as many women as men. Women MPs went from 11% in 1997 to 39% in 2017.",
      tr: "En France, une loi sur la parité oblige les partis à présenter autant de femmes que d’hommes. Les députées sont passées de 11 % en 1997 à 39 % en 2017.",
      use: "Pour : la loi a marché. Contre : certains partis préfèrent payer l’amende." },
    { theme: "Sport", side: "both", title: "Paris 2024: the first 50/50 Olympics",
      en: "Paris 2024 were the first Olympic Games with as many women as men, thanks to a 50/50 quota of places. But only 13% of the coaches were women.",
      tr: "Les JO de Paris 2024 ont été les premiers avec autant de femmes que d’hommes, grâce à un quota de places 50/50. Mais seulement 13 % des entraîneurs étaient des femmes.",
      use: "Pour : le quota a marché. Contre : il n’a rien changé là où il ne s’appliquait pas." },
    { theme: "Monde", side: "pour", title: "Rwanda: a world record",
      en: "Only about one in four MPs in the world is a woman. In Rwanda, which has quotas in its Constitution, a whopping 64% of MPs are women.",
      tr: "Seul environ un parlementaire sur quatre dans le monde est une femme. Au Rwanda, qui a des quotas dans sa Constitution, 64 % des députés sont des femmes, un chiffre énorme.",
      use: "Pour : avec des quotas, les femmes arrivent au pouvoir." }
  ],

  /* 10 phrases pour débattre */
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
        answer: "I agree that the best person should get the job. But today, managers often promote people who look like them. A quota doesn’t mean hiring someone who isn’t qualified: it means looking harder.",
        answerTr: "Je suis d’accord, c’est le meilleur qui doit avoir le poste. Mais aujourd’hui, les managers promeuvent souvent des gens qui leur ressemblent. Un quota ne veut pas dire embaucher quelqu’un de non qualifié : ça veut dire chercher mieux." },
      { id: "sp2", who: "oliver", en: "Women promoted with a quota will be seen as token women.",
        tr: "Les femmes promues grâce à un quota seront vues comme des femmes alibis.",
        answer: "When boards were 95% male, nobody talked about “token men”. And once there are many women at the top, nobody will talk about token women either.",
        answerTr: "Quand les conseils étaient masculins à 95 %, personne ne parlait d’« hommes alibis ». Et quand il y aura beaucoup de femmes au sommet, personne ne parlera plus de femmes alibis non plus." },
      { id: "sp3", who: "james", en: "The UK reached 43% women on boards without quotas. Why change?",
        tr: "Le Royaume-Uni a atteint 43 % de femmes dans les conseils sans quotas. Pourquoi changer ?",
        answer: "That’s great for boards. But only about one in ten of the biggest UK companies has a female CEO, and the 43% didn’t move last year. Progress has stalled.",
        answerTr: "C’est très bien pour les conseils. Mais seulement environ une grande entreprise britannique sur dix a une femme PDG, et les 43 % n’ont pas bougé l’an dernier. Le progrès est bloqué." },
      { id: "sp4", who: "oliver", en: "Quotas are illegal in the UK.",
        tr: "Les quotas sont illégaux au Royaume-Uni.",
        answer: "Positive discrimination is illegal, that’s true. But the law allows a lot: ambitious targets, mentoring, and choosing the woman when two candidates are equally qualified.",
        answerTr: "La discrimination positive est illégale, c’est vrai. Mais la loi permet beaucoup de choses : des objectifs ambitieux, du mentorat, et choisir la femme quand deux candidats sont aussi qualifiés l’un que l’autre." },
      { id: "sp5", who: "james", en: "There’s no proof that more women make a company more profitable.",
        tr: "Rien ne prouve que plus de femmes rendent une entreprise plus rentable.",
        answer: "Maybe the link is not perfect, but there’s no proof that it hurts either. McKinsey found that the most diverse top teams are 39% more likely to outperform.",
        answerTr: "Le lien n’est peut-être pas parfait, mais rien ne prouve que ça nuit non plus. McKinsey a montré que les équipes de direction les plus diverses ont 39 % de chances en plus d’être plus performantes." },
      { id: "sp6", who: "oliver", en: "Women don’t want these top jobs. It’s their choice.",
        tr: "Les femmes ne veulent pas de ces postes. C’est leur choix.",
        answer: "Some women don’t want them, and some men don’t either. But for every 100 men promoted to manager, only 93 women are promoted. It’s not a choice when the door is closed.",
        answerTr: "Certaines femmes n’en veulent pas, et certains hommes non plus. Mais pour 100 hommes promus managers, seulement 93 femmes le sont. Ce n’est pas un choix quand la porte est fermée." }
    ],
    vsContre: [
      { id: "sc1", who: "emma", en: "Voluntary measures don’t work. We’ll wait 120 years!",
        tr: "Les mesures volontaires ne marchent pas. On va attendre 120 ans !",
        answer: "They can work when they’re serious. The UK went from 9.5% to 43% women on boards without a law, and Asics reached 41% women managers with a target.",
        answerTr: "Elles peuvent marcher quand elles sont sérieuses. Le Royaume-Uni est passé de 9,5 % à 43 % de femmes dans les conseils sans loi, et Asics a atteint 41 % de femmes managers avec un objectif." },
      { id: "sc2", who: "priya", en: "Quotas work: look at Norway and France.",
        tr: "Les quotas marchent : regarde la Norvège et la France.",
        answer: "They change the numbers on the board, yes. But in Norway, they helped a small elite, the “golden skirts”, not ordinary female employees.",
        answerTr: "Ils changent les chiffres dans les conseils, oui. Mais en Norvège, ils ont aidé une petite élite, les « golden skirts », pas les salariées ordinaires." },
      { id: "sc3", who: "emma", en: "Diverse companies are 39% more likely to outperform.",
        tr: "Les entreprises diverses ont 39 % de chances en plus d’être plus performantes.",
        answer: "That’s McKinsey, and it’s a correlation, not a proof. Maybe successful companies can simply afford more diversity. Other researchers couldn’t reproduce these results.",
        answerTr: "C’est McKinsey, et c’est une corrélation, pas une preuve. Peut-être que les entreprises qui réussissent peuvent simplement se permettre plus de diversité. D’autres chercheurs n’ont pas réussi à reproduire ces résultats." },
      { id: "sc4", who: "priya", en: "Girls need role models. Quotas create them.",
        tr: "Les filles ont besoin de modèles. Les quotas en créent.",
        answer: "I agree that role models matter. But a role model is powerful because she earned her place. With a quota, people may doubt her.",
        answerTr: "Je suis d’accord, les modèles comptent. Mais un modèle est fort parce qu’elle a mérité sa place. Avec un quota, les gens risquent de douter d’elle." },
      { id: "sc5", who: "emma", en: "The pay gap is still 11% in the EU.",
        tr: "L’écart de salaire est encore de 11 % dans l’UE.",
        answer: "It’s falling: it was almost 16% in 2014. And a board quota doesn’t fix pay. The real problem is the motherhood penalty: we need better childcare and parental leave.",
        answerTr: "Il baisse : il était de presque 16 % en 2014. Et un quota dans les conseils ne règle pas les salaires. Le vrai problème, c’est la pénalité de la maternité : il faut de meilleures solutions de garde et de congé parental." },
      { id: "sc6", who: "priya", en: "At our headquarters in Japan, only 20% of managers are women. We need a quota!",
        tr: "Au siège, au Japon, seulement 20 % des managers sont des femmes. Il faut un quota !",
        answer: "That’s a fair point about Japan. But in Europe, 42.6% of our managers are already women. One global quota doesn’t make sense: each region needs its own plan.",
        answerTr: "C’est un bon point pour le Japon. Mais en Europe, 42,6 % de nos managers sont déjà des femmes. Un quota mondial unique n’a pas de sens : chaque région a besoin de son propre plan." }
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
