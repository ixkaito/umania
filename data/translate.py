import time
from SPARQLWrapper import SPARQLWrapper, JSON


names = [
    'Adjule',

    'Agogwe',

    'Ahool',

    'Akkorokamui',

    'Almas_(cryptozoology)',

    'Altamaha-ha',

    'Ameranthropoides_loysi',

    'Amomongo',

    'Andean_Wolf',

    'Black_Panther#Cougar',

    'note-Panthersight-1',

    'Aswang',

    'Atti',

    'Ayia_Napa_sea_monster',

    'Barmanou',

    'Batutut',

    'Beaman_(cryptid)',

    'Bear_Lake_Monster',

    'Beast_of_Bladenboro',

    'Beast_of_Bodmin',

    'Beast_of_Bray_Road',

    'Beast_of_Busco',

    'Dartmoor#Myths_and_literature',

    'Beast_of_Dean',

    'Beast_of_Exmoor',

    'Beast_of_G%C3%A9vaudan',

    'Bergman%27s_bear',

    'Bessie_(lake_monster)',

    'Bigfoot',

    'Black_Shuck',

    'Bownessie',

    'British_big_cats',

    'Brosno_dragon',

    'Bukit_Timah_Monkey_Man',

    'Bunyip',

    'Burmese_gray_wild_dog',

    'Buru_(cryptozoology)',

    'Cadborosaurus_willsi',

    'note-3',

    'Canvey_Island_Monster',

    'Cardiff_Giant',

    'Champ_(cryptozoology)',

    'Cherufe',

    'Chessie_(sea_monster)',

    'Chickcharney',

    'Chuchunya',

    'Chupacabra',

    'Dingonek',

    'Devil_Bird',

    'Dobhar-ch%C3%BA',

    'Dover_Demon',

    'Eastern_Cougar',

    'Ebu_Gogo',

    'Elasmotherium',

    'Elmendorf_Beast',

    'Elwedritsche',

    'Emela-ntouka',

    'Enfield_Monster',

    'Ennedi_tiger',

    'Fear_liath',

    'Fiskerton_Phantom',

    'Flatwoods_monster',

    'Flying_Rod',

    'Fouke_Monster',

    'Fur-bearing_trout',

    'Loup-garou',

    'Gazeka',

    'Gambo',

    'Ghost_Deer',

    'Giant_anaconda',

    'Giglioli%27s_Whale',

    'Globster',

    'Sea_Serpent#Historical_and_notable_cases',

    'Gnome_of_Gerona',

    'Goatman_(Maryland)',

    'Grassman',

    'Gunni',

    'Grootslang',

    'Hakawai',

    'Hellhound',

    'Hibagon',

    'note-shuker-7',

    'Hodag',

    'Hokkaid%C5%8D_Wolf',

    'Homo_gardarensis',

    'Honey_Island_Swamp_monster',

    'Honsh%C5%AB_wolf',

    'Hoop_snake',

    'Huay_Chivo',

    'Igopogo',

    'Iliamna_Lake_Monster',

    'Inkanyamba',

    'Isshii',

    'Ivory-billed_Woodpecker',

    'Jba_Fofi',

    'note-11',

    'Jackalope',

    'Jersey_Devil',

    'Kaijin_(cryptid)',

    'Kappa_(mythical_creature)',

    'Kawekaweau',

    'Kelpie',

    'note-12',

    'Kingstie',

    'Kongamato',

    'Koolakamba',

    'Kraken',

    'Kting_Voar',

    'Kumi_Lizard',

    'Kusshii',

    'Lagarflj%C3%B3t_Worm',

    'Lake_Tianchi_Monster',

    'Lake_Van_Monster',

    'Lake_Worth_monster',

    'Lariosauro',

    'Lizard_Man_of_Scape_Ore_Swamp',

    'Loch_Ness_Monster',

    'Loveland_Frog',

    'Lusca',

    'MacFarlane%27s_Bear',

    'Maero',

    'Mahamba',

    'Maltese_Tiger',

    'Mamlambo',

    'Manananggal',

    'Manatee_of_Helena',

    'Mande_Barung',

    'Man-eating_tree',

    'Manipogo',

    'Mapinguari',

    'Maricoxi',

    'Marozi',

    'Mbielu-Mbielu-Mbielu',

    'Megalania_prisca',

    'Megalodon',

    'Melon_heads',

    'Memphre',

    'Menehune',

    'Mermaid',

    'Merman',

    'Minhoc%C3%A3o_(animal)',

    'Minnesota_Iceman',

    'Mitla_(cryptid)',

    'Mngwa',

    'Moa',

    'Moehau',

    'Mogollon_Monster',

    'Mokele-Mbembe',

    'Momo_the_Monster',

    'Mongolian_Death_Worm',

    'Monkey-man_of_Delhi',

    'Mono_Grande',

    'Montauk_Monster',

    'Morag_(lake_monster)',

    'Mothman',

    'Mountain_Fennec',

    'Muckie',

    'Muc-sheilch',

    'Muhuru_(cryptid)',

    'Mussie',

    'ex.php?title=Monster_of_Monterey&action=edit&redlink=1',

    'Nahuelito',

    'Nandi_Bear',

    'note-18',

    'note-19',

    'Ngoubou',

    'Nguma-monene',

    'Ogopogo',

    'Old_Yellow_Top',

    'Olitiau',

    'Onza',

    'Orang-Bati',

    'Orang_Mawas',

    'Orang_Pendek',

    'Owlman',

    'Ozark_Howler',

    'Panthera_tigris_sudanensis',

    'Peluda',

    'Phantom_cat',

    'Phantom_kangaroo',

    'Phaya_Naga',

    'Pogeyan',

    'Popobawa',

    'Pope_Lick_Monster',

    'Poukai',

    'Pukwudgie',

    'ex.php?title=Pygmy_Gorilla&action=edit&redlink=1',

    'Pygmy_Elephant',

    'Qilin',

    'Queensland_Tiger',

    'The_Rake_(cryptid)',

    'Reptilians',

    'Ropen',

    'note-21',

    'Set_animal#Salawa_cryptid',

    'Sea_monk',

    'Sea_monster',

    'Sea_serpent',

    'Selma_(sea_serpent)',

    'Sewer_alligator',

    'Sharlie',

    'Sh%C5%8Dj%C5%8D',

    'Shug_Monkey',

    'Shunka_Warakin',

    'Sigbin',

    'Sirrush',

    'Skunk_Ape',

    'Spring-heeled_Jack',

    'Steller%27s_Sea_Ape',

    'Storsj%C3%B6odjuret',

    'Stronsay_Beast',

    'Sucuriju_Gigante',

    'note-22',

    'Tahoe_Tessie',

    'note-23',

    'Tapire-iauara',

    'Tatzelwurm',

    'Thetis_Lake_monster',

    'Thunderbird_(cryptozoology)',

    'Thylacine',

    'Tikbalang',

    'Trinity_Alps_giant_salamander',

    'Trunko',

    'Tsuchinoko',

    'Tsul_%27Kalu',

    'Turtle_Lake_Monster',

    'Umdhlebi',

    'Urayuli',

    'Veo',

    'Waheela',

    'Waitoreke',

    'Wampus_Cat',

    'Wendigo',

    'Wild_Man_of_the_Navidad',

    'Wolpertinger',

    'Wucharia',

    'Man-eating_tree#The_Ya-te-veo',

    'Yeren',

    'Yeti',

    'Yowie',

    'Zanzibar_Leopard',

    'Zuiy%C5%8D-maru_creature',
]


def main():
    for name in names:
        sparql = SPARQLWrapper('http://dbpedia.org/sparql')
        sparql.setQuery('''
        select distinct ?o {{
            ?s ?p "{0}"@en;
            <http://www.w3.org/2002/07/owl#sameAs> ?o.
            FILTER regex(str(?o), "http://ja.dbpedia")
        }}'''.format(name))
        sparql.setReturnFormat(JSON)
        results = sparql.query().convert()

        for result in results['results']['bindings']:
            print(name, result['o']['value'])
    time.sleep(1)

if __name__ == '__main__':
    main()
