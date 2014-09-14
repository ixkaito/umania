import urllib.parse

text = '''Akkorokamui http://ja.dbpedia.org/resource/アッコロカムイ
Aswang http://ja.dbpedia.org/resource/アスワング
Bigfoot http://ja.dbpedia.org/resource/ビッグフット
Bunyip http://ja.dbpedia.org/resource/バニップ
Chupacabra http://ja.dbpedia.org/resource/チュパカブラ
Elasmotherium http://ja.dbpedia.org/resource/エラスモテリウム
Globster http://ja.dbpedia.org/resource/グロブスター
Grootslang http://ja.dbpedia.org/resource/グローツラング
Hellhound http://ja.dbpedia.org/resource/ヘルハウンド
Hibagon http://ja.dbpedia.org/resource/ヒバゴン
Inkanyamba http://ja.dbpedia.org/resource/インカニヤンバ
Jackalope http://ja.dbpedia.org/resource/ジャッカロープ
Kelpie http://ja.dbpedia.org/resource/オーストラリアン・ケルピー
Kelpie http://ja.dbpedia.org/resource/ケルピー
Kongamato http://ja.dbpedia.org/resource/コンガマトー
Kraken http://ja.dbpedia.org/resource/クラーケン
Manananggal http://ja.dbpedia.org/resource/マナナンガル
Manipogo http://ja.dbpedia.org/resource/マニポゴ
Megalodon http://ja.dbpedia.org/resource/メガロドン
Mermaid http://ja.dbpedia.org/resource/人魚
Moa http://ja.dbpedia.org/resource/モア
Mothman http://ja.dbpedia.org/resource/モスマン
Nahuelito http://ja.dbpedia.org/resource/ナウエリート
Ogopogo http://ja.dbpedia.org/resource/オゴポゴ
Owlman http://ja.dbpedia.org/resource/フクロウ男
Peluda http://ja.dbpedia.org/resource/ペルーダ
Qilin http://ja.dbpedia.org/resource/麒麟
Sirrush http://ja.dbpedia.org/resource/ムシュフシュ
Tatzelwurm http://ja.dbpedia.org/resource/タッツェルブルム
Thylacine http://ja.dbpedia.org/resource/フクロオオカミ
Tsuchinoko http://ja.dbpedia.org/resource/ツチノコ
Wendigo http://ja.dbpedia.org/resource/ウェンディゴ
Yeren http://ja.dbpedia.org/resource/野人
Yeti http://ja.dbpedia.org/resource/イエティ
Yowie http://ja.dbpedia.org/resource/ヨーウィー'''


def main():
    for row in text.split('\n'):
        name, url = row.split()
        jpname = url.split('/')[-1]
        print(jpname,
              'http://ja.wikipedia.org/wiki/' + urllib.parse.quote(jpname))


if __name__ == '__main__':
    main()
