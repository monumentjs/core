/* tslint:disable:variable-name */
import {
  EquatableEquals,
  MultiValueEquals,
  StrictEquals
} from '@monument/core';
import { Equatable } from '@monument/contracts';
import { TimeZoneOffset } from './TimeZoneOffset';

/**
 * Represents time zone.
 * @since 0.14.1
 * @author Alex Chugaev
 * @todo define names of known time zones
 */
export class TimeZone implements Equatable<TimeZone> {
  static readonly AustralianCentralDaylightSavingsTime = new TimeZone(TimeZoneOffset.positive(10, 30), 'ACDT', 'Australian Central Daylight Savings Time');
  static readonly AustralianCentralStandardTime = new TimeZone(TimeZoneOffset.positive(9, 30), 'ACST', 'Australian Central Standard Time');
  static readonly AcreTime = new TimeZone(TimeZoneOffset.negative(5), 'ACT', 'Acre Time');
  static readonly AtlanticDaylightTime = new TimeZone(TimeZoneOffset.negative(3), 'ADT');
  static readonly AustralianEasternDaylightSavingsTime = new TimeZone(TimeZoneOffset.positive(11), 'AEDT');
  static readonly AustralianEasternStandardTime = new TimeZone(TimeZoneOffset.positive(10), 'AEST');
  static readonly AfghanistanTime = new TimeZone(TimeZoneOffset.positive(4, 30), 'AFT');
  static readonly AlaskaDaylightTime = new TimeZone(TimeZoneOffset.negative(8), 'AKDT');
  static readonly AlaskaStandardTime = new TimeZone(TimeZoneOffset.negative(9), 'AKST');
  static readonly AlmaAtaTime = new TimeZone(TimeZoneOffset.positive(6), 'ALMT');
  static readonly AmazonSummerTime = new TimeZone(TimeZoneOffset.negative(3), 'AMST');
  static readonly AmazonTime = new TimeZone(TimeZoneOffset.negative(4), 'AMT');
  static readonly ArmeniaTime = new TimeZone(TimeZoneOffset.positive(4), 'AMT');
  static readonly AnadyrTime = new TimeZone(TimeZoneOffset.positive(12), 'ANAT');
  static readonly AqtobeTime = new TimeZone(TimeZoneOffset.positive(5), 'AQTT');
  static readonly ArgentinaTime = new TimeZone(TimeZoneOffset.negative(3), 'ART');
  static readonly ArabiaStandardTime = new TimeZone(TimeZoneOffset.positive(3), 'AST');
  static readonly AtlanticStandardTime = new TimeZone(TimeZoneOffset.negative(4), 'AST');
  static readonly AustralianWesternStandardTime = new TimeZone(TimeZoneOffset.positive(8), 'AWST');
  static readonly AzoresSummerTime = new TimeZone(TimeZoneOffset.positive(0), 'AZOST');
  static readonly AzoresStandardTime = new TimeZone(TimeZoneOffset.negative(1), 'AZOT');
  static readonly AzerbaijanTime = new TimeZone(TimeZoneOffset.positive(4), 'AZT');
  static readonly BruneiTime = new TimeZone(TimeZoneOffset.positive(8), 'BDT');
  static readonly BritishIndianOceanTime = new TimeZone(TimeZoneOffset.positive(6), 'BIOT');
  static readonly BakerIslandTime = new TimeZone(TimeZoneOffset.negative(12), 'BIT');
  static readonly BoliviaTime = new TimeZone(TimeZoneOffset.negative(4), 'BOT');
  static readonly BrasiliaSummerTime = new TimeZone(TimeZoneOffset.negative(2), 'BRST');
  static readonly BrasiliaTime = new TimeZone(TimeZoneOffset.negative(3), 'BRT');
  static readonly BangladeshStandardTime = new TimeZone(TimeZoneOffset.positive(6), 'BST');
  static readonly BougainvilleStandardTime = new TimeZone(TimeZoneOffset.positive(11), 'BST');
  static readonly BritishSummerTime = new TimeZone(TimeZoneOffset.positive(1), 'BST');
  static readonly BhutanTime = new TimeZone(TimeZoneOffset.positive(6), 'BTT');
  static readonly CentralAfricaTime = new TimeZone(TimeZoneOffset.positive(2), 'CAT');
  static readonly CocosIslandsTime = new TimeZone(TimeZoneOffset.positive(6, 30), 'CCT');
  static readonly CentralDaylightTime = new TimeZone(TimeZoneOffset.negative(5), 'CDT');
  static readonly CubaDaylightTime = new TimeZone(TimeZoneOffset.negative(4), 'CDT');
  static readonly CentralEuropeanSummerTime = new TimeZone(TimeZoneOffset.positive(2), 'CEST');
  static readonly CentralEuropeanTime = new TimeZone(TimeZoneOffset.positive(1), 'CET');
  static readonly ChathamDaylightTime = new TimeZone(TimeZoneOffset.positive(13, 45), 'CHADT');
  static readonly ChathamStandardTime = new TimeZone(TimeZoneOffset.positive(12, 45), 'CHAST');
  static readonly ChoibalsanStandardTime = new TimeZone(TimeZoneOffset.positive(8), 'CHOT');
  static readonly ChoibalsanSummerTime = new TimeZone(TimeZoneOffset.positive(9), 'CHOST');
  static readonly ChamorroStandardTime = new TimeZone(TimeZoneOffset.positive(10), 'CHST');
  static readonly ChuukTime = new TimeZone(TimeZoneOffset.positive(10), 'CHUT');
  static readonly ClippertonIslandStandardTime = new TimeZone(TimeZoneOffset.negative(8), 'CIST');
  static readonly CentralIndonesiaTime = new TimeZone(TimeZoneOffset.positive(8), 'CIT');
  static readonly CookIslandTime = new TimeZone(TimeZoneOffset.negative(10), 'CKT');
  static readonly ChileSummerTime = new TimeZone(TimeZoneOffset.negative(3), 'CLST');
  static readonly ChileStandardTime = new TimeZone(TimeZoneOffset.negative(4), 'CLT');
  static readonly ColombiaSummerTime = new TimeZone(TimeZoneOffset.negative(4), 'COST');
  static readonly ColombiaTime = new TimeZone(TimeZoneOffset.negative(5), 'COT');
  static readonly CentralStandardTime = new TimeZone(TimeZoneOffset.negative(6), 'CST');
  static readonly ChinaStandardTime = new TimeZone(TimeZoneOffset.positive(8), 'CST');
  static readonly CubaStandardTime = new TimeZone(TimeZoneOffset.negative(5), 'CST');
  static readonly ChinaTime = new TimeZone(TimeZoneOffset.positive(8), 'CT');
  static readonly CapeVerdeTime = new TimeZone(TimeZoneOffset.negative(1), 'CVT');
  static readonly CentralWesternStandardTime = new TimeZone(TimeZoneOffset.positive(8, 45), 'CWST');
  static readonly ChristmasIslandTime = new TimeZone(TimeZoneOffset.positive(7), 'CXT');
  static readonly DavisTime = new TimeZone(TimeZoneOffset.positive(7), 'DAVT');
  static readonly DumontDUrvilleTime = new TimeZone(TimeZoneOffset.positive(10), 'DDUT');
  static readonly EasterIslandSummerTime = new TimeZone(TimeZoneOffset.negative(5), 'EASST');
  static readonly EasterIslandStandardTime = new TimeZone(TimeZoneOffset.negative(6), 'EAST');
  static readonly EastAfricaTime = new TimeZone(TimeZoneOffset.positive(3), 'EAT');
  static readonly EasternCaribbeanTime = new TimeZone(TimeZoneOffset.negative(4), 'ECT');
  static readonly EcuadorTime = new TimeZone(TimeZoneOffset.negative(5), 'ECT');
  static readonly EasternDaylightTime = new TimeZone(TimeZoneOffset.negative(4), 'EDT');
  static readonly EasternEuropeanSummerTime = new TimeZone(TimeZoneOffset.positive(3), 'EEST');
  static readonly EasternEuropeanTime = new TimeZone(TimeZoneOffset.positive(2), 'EET');
  static readonly EasternGreenlandSummerTime = new TimeZone(TimeZoneOffset.positive(0), 'EGST');
  static readonly EasternGreenlandTime = new TimeZone(TimeZoneOffset.negative(1), 'EGT');
  static readonly EasternIndonesianTime = new TimeZone(TimeZoneOffset.positive(9), 'EIT');
  static readonly EasternStandardTime = new TimeZone(TimeZoneOffset.negative(5), 'EST');
  static readonly FurtherEasternEuropeanTime = new TimeZone(TimeZoneOffset.positive(3), 'FET');
  static readonly FijiTime = new TimeZone(TimeZoneOffset.positive(12), 'FJT');
  static readonly FalklandIslandsSummerTime = new TimeZone(TimeZoneOffset.negative(3), 'FKST');
  static readonly FalklandIslandsTime = new TimeZone(TimeZoneOffset.negative(4), 'FKT');
  static readonly FernandodeNoronhaTime = new TimeZone(TimeZoneOffset.negative(2), 'FNT');
  static readonly GalapagosTime = new TimeZone(TimeZoneOffset.negative(6), 'GALT');
  static readonly GambierIslandsTime = new TimeZone(TimeZoneOffset.negative(9), 'GAMT');
  static readonly GeorgiaStandardTime = new TimeZone(TimeZoneOffset.positive(4), 'GET');
  static readonly FrenchGuianaTime = new TimeZone(TimeZoneOffset.negative(3), 'GFT');
  static readonly GilbertIslandTime = new TimeZone(TimeZoneOffset.positive(12), 'GILT');
  static readonly GambierIslandTime = new TimeZone(TimeZoneOffset.negative(9), 'GIT');
  static readonly GreenwichMeanTime = new TimeZone(TimeZoneOffset.positive(0), 'GMT');
  static readonly SouthGeorgiaAndTheSouthSandwichIslandsTime = new TimeZone(TimeZoneOffset.negative(2), 'GST');
  static readonly GulfStandardTime = new TimeZone(TimeZoneOffset.positive(4), 'GST');
  static readonly GuyanaTime = new TimeZone(TimeZoneOffset.negative(4), 'GYT');
  static readonly HawaiiAleutianDaylightTime = new TimeZone(TimeZoneOffset.negative(9), 'HDT');
  static readonly HeureAvanceedEuropeCentrale = new TimeZone(TimeZoneOffset.positive(2), 'HAEC');
  static readonly HawaiiAleutianStandardTime = new TimeZone(TimeZoneOffset.negative(10), 'HST');
  static readonly HongKongTime = new TimeZone(TimeZoneOffset.positive(8), 'HKT');
  static readonly HeardandMcDonaldIslandsTime = new TimeZone(TimeZoneOffset.positive(5), 'HMT');
  static readonly KhovdSummerTime = new TimeZone(TimeZoneOffset.positive(8), 'HOVST');
  static readonly KhovdStandardTime = new TimeZone(TimeZoneOffset.positive(7), 'HOVT');
  static readonly IndochinaTime = new TimeZone(TimeZoneOffset.positive(7), 'ICT');
  static readonly InternationalDayLineWesttimezone = new TimeZone(TimeZoneOffset.negative(12), 'IDLW');
  static readonly IsraelDaylightTime = new TimeZone(TimeZoneOffset.positive(3), 'IDT');
  static readonly IndianOceanTime = new TimeZone(TimeZoneOffset.positive(3), 'IOT');
  static readonly IranDaylightTime = new TimeZone(TimeZoneOffset.positive(4, 30), 'IRDT');
  static readonly IrkutskTime = new TimeZone(TimeZoneOffset.positive(8), 'IRKT');
  static readonly IranStandardTime = new TimeZone(TimeZoneOffset.positive(3, 30), 'IRST');
  static readonly IndianStandardTime = new TimeZone(TimeZoneOffset.positive(5, 30), 'IST');
  static readonly IrishStandardTime = new TimeZone(TimeZoneOffset.positive(1), 'IST');
  static readonly IsraelStandardTime = new TimeZone(TimeZoneOffset.positive(2), 'IST');
  static readonly JapanStandardTime = new TimeZone(TimeZoneOffset.positive(9), 'JST');
  static readonly KaliningradTime = new TimeZone(TimeZoneOffset.positive(2), 'KALT');
  static readonly KyrgyzstanTime = new TimeZone(TimeZoneOffset.positive(6), 'KGT');
  static readonly KosraeTime = new TimeZone(TimeZoneOffset.positive(11), 'KOST');
  static readonly KrasnoyarskTime = new TimeZone(TimeZoneOffset.positive(7), 'KRAT');
  static readonly KoreaStandardTime = new TimeZone(TimeZoneOffset.positive(9), 'KST');
  static readonly LordHoweStandardTime = new TimeZone(TimeZoneOffset.positive(10, 30), 'LHST');
  static readonly LordHoweSummerTime = new TimeZone(TimeZoneOffset.positive(11), 'LHST');
  static readonly LineIslandsTime = new TimeZone(TimeZoneOffset.positive(14), 'LINT');
  static readonly MagadanTime = new TimeZone(TimeZoneOffset.positive(12), 'MAGT');
  static readonly MarquesasTime = new TimeZone(TimeZoneOffset.negative(9, 30), 'MART');
  static readonly MawsonStationTime = new TimeZone(TimeZoneOffset.positive(5), 'MAWT');
  static readonly MountainDaylightTime = new TimeZone(TimeZoneOffset.negative(6), 'MDT');
  static readonly MiddleEuropeanTime = new TimeZone(TimeZoneOffset.positive(1), 'MET');
  static readonly MiddleEuropeanSummerTime = new TimeZone(TimeZoneOffset.positive(2), 'MEST');
  static readonly MarshallIslandsTime = new TimeZone(TimeZoneOffset.positive(12), 'MHT');
  static readonly MacquarieIslandStationTime = new TimeZone(TimeZoneOffset.positive(11), 'MIST');
  static readonly MarquesasIslandsTime = new TimeZone(TimeZoneOffset.negative(9, 30), 'MIT');
  static readonly MyanmarStandardTime = new TimeZone(TimeZoneOffset.positive(6, 30), 'MMT');
  static readonly MoscowTime = new TimeZone(TimeZoneOffset.positive(3), 'MSK');
  static readonly MalaysiaStandardTime = new TimeZone(TimeZoneOffset.positive(8), 'MST');
  static readonly MountainStandardTime = new TimeZone(TimeZoneOffset.negative(7), 'MST');
  static readonly MauritiusTime = new TimeZone(TimeZoneOffset.positive(4), 'MUT');
  static readonly MaldivesTime = new TimeZone(TimeZoneOffset.positive(5), 'MVT');
  static readonly MalaysiaTime = new TimeZone(TimeZoneOffset.positive(8), 'MYT');
  static readonly NewCaledoniaTime = new TimeZone(TimeZoneOffset.positive(11), 'NCT');
  static readonly NewfoundlandDaylightTime = new TimeZone(TimeZoneOffset.negative(2, 30), 'NDT');
  static readonly NorfolkIslandTime = new TimeZone(TimeZoneOffset.positive(11), 'NFT');
  static readonly NovosibirskTime = new TimeZone(TimeZoneOffset.positive(7), 'NOVT');
  static readonly NepalTime = new TimeZone(TimeZoneOffset.positive(5, 45), 'NPT');
  static readonly NewfoundlandStandardTime = new TimeZone(TimeZoneOffset.negative(3, 30), 'NST');
  static readonly NewfoundlandTime = new TimeZone(TimeZoneOffset.negative(3, 30), 'NT');
  static readonly NiueTime = new TimeZone(TimeZoneOffset.negative(11), 'NUT');
  static readonly NewZealandDaylightTime = new TimeZone(TimeZoneOffset.positive(13), 'NZDT');
  static readonly NewZealandStandardTime = new TimeZone(TimeZoneOffset.positive(12), 'NZST');
  static readonly OmskTime = new TimeZone(TimeZoneOffset.positive(6), 'OMST');
  static readonly OralTime = new TimeZone(TimeZoneOffset.positive(5), 'ORAT');
  static readonly PacificDaylightTime = new TimeZone(TimeZoneOffset.negative(7), 'PDT');
  static readonly PeruTime = new TimeZone(TimeZoneOffset.negative(5), 'PET');
  static readonly KamchatkaTime = new TimeZone(TimeZoneOffset.positive(12), 'PETT');
  static readonly PapuaNewGuineaTime = new TimeZone(TimeZoneOffset.positive(10), 'PGT');
  static readonly PhoenixIslandTime = new TimeZone(TimeZoneOffset.positive(13), 'PHOT');
  static readonly PhilippineTime = new TimeZone(TimeZoneOffset.positive(8), 'PHT');
  static readonly PakistanStandardTime = new TimeZone(TimeZoneOffset.positive(5), 'PKT');
  static readonly SaintPierreandMiquelonDaylightTime = new TimeZone(TimeZoneOffset.negative(2), 'PMDT');
  static readonly SaintPierreandMiquelonStandardTime = new TimeZone(TimeZoneOffset.negative(3), 'PMST');
  static readonly PohnpeiStandardTime = new TimeZone(TimeZoneOffset.positive(11), 'PONT');
  static readonly PacificStandardTime = new TimeZone(TimeZoneOffset.negative(8), 'PST');
  static readonly PhilippineStandardTime = new TimeZone(TimeZoneOffset.positive(8), 'PST');
  static readonly ParaguaySummerTime = new TimeZone(TimeZoneOffset.negative(3), 'PYST');
  static readonly ParaguayTime = new TimeZone(TimeZoneOffset.negative(4), 'PYT');
  static readonly ReunionTime = new TimeZone(TimeZoneOffset.positive(4), 'RET');
  static readonly RotheraResearchStationTime = new TimeZone(TimeZoneOffset.negative(3), 'ROTT');
  static readonly SakhalinIslandTime = new TimeZone(TimeZoneOffset.positive(11), 'SAKT');
  static readonly SamaraTime = new TimeZone(TimeZoneOffset.positive(4), 'SAMT');
  static readonly SouthAfricanStandardTime = new TimeZone(TimeZoneOffset.positive(2), 'SAST');
  static readonly SolomonIslandsTime = new TimeZone(TimeZoneOffset.positive(11), 'SBT');
  static readonly SeychellesTime = new TimeZone(TimeZoneOffset.positive(4), 'SCT');
  static readonly SamoaDaylightTime = new TimeZone(TimeZoneOffset.negative(10), 'SDT');
  static readonly SingaporeTime = new TimeZone(TimeZoneOffset.positive(8), 'SGT');
  static readonly SriLankaStandardTime = new TimeZone(TimeZoneOffset.positive(5, 30), 'SLST');
  static readonly SrednekolymskTime = new TimeZone(TimeZoneOffset.positive(11), 'SRET');
  static readonly SurinameTime = new TimeZone(TimeZoneOffset.negative(3), 'SRT');
  static readonly SamoaStandardTime = new TimeZone(TimeZoneOffset.negative(11), 'SST');
  static readonly SingaporeStandardTime = new TimeZone(TimeZoneOffset.positive(8), 'SST');
  static readonly ShowaStationTime = new TimeZone(TimeZoneOffset.positive(3), 'SYOT');
  static readonly TahitiTime = new TimeZone(TimeZoneOffset.negative(10), 'TAHT');
  static readonly ThailandStandardTime = new TimeZone(TimeZoneOffset.positive(7), 'THA');
  static readonly FrenchSouthernandAntarcticTime = new TimeZone(TimeZoneOffset.positive(5), 'TFT');
  static readonly TajikistanTime = new TimeZone(TimeZoneOffset.positive(5), 'TJT');
  static readonly TokelauTime = new TimeZone(TimeZoneOffset.positive(13), 'TKT');
  static readonly TimorLesteTime = new TimeZone(TimeZoneOffset.positive(9), 'TLT');
  static readonly TurkmenistanTime = new TimeZone(TimeZoneOffset.positive(5), 'TMT');
  static readonly TurkeyTime = new TimeZone(TimeZoneOffset.positive(3), 'TRT');
  static readonly TongaTime = new TimeZone(TimeZoneOffset.positive(13), 'TOT');
  static readonly TuvaluTime = new TimeZone(TimeZoneOffset.positive(12), 'TVT');
  static readonly UlaanbaatarSummerTime = new TimeZone(TimeZoneOffset.positive(9), 'ULAST');
  static readonly UlaanbaatarStandardTime = new TimeZone(TimeZoneOffset.positive(8), 'ULAT');
  static readonly CoordinatedUniversalTime = new TimeZone(TimeZoneOffset.positive(0), 'UTC');
  static readonly UruguaySummerTime = new TimeZone(TimeZoneOffset.negative(2), 'UYST');
  static readonly UruguayStandardTime = new TimeZone(TimeZoneOffset.negative(3), 'UYT');
  static readonly UzbekistanTime = new TimeZone(TimeZoneOffset.positive(5), 'UZT');
  static readonly VenezuelanStandardTime = new TimeZone(TimeZoneOffset.negative(4), 'VET');
  static readonly VladivostokTime = new TimeZone(TimeZoneOffset.positive(10), 'VLAT');
  static readonly VolgogradTime = new TimeZone(TimeZoneOffset.positive(4), 'VOLT');
  static readonly VostokStationTime = new TimeZone(TimeZoneOffset.positive(6), 'VOST');
  static readonly VanuatuTime = new TimeZone(TimeZoneOffset.positive(11), 'VUT');
  static readonly WakeIslandTime = new TimeZone(TimeZoneOffset.positive(12), 'WAKT');
  static readonly WestAfricaSummerTime = new TimeZone(TimeZoneOffset.positive(2), 'WAST');
  static readonly WestAfricaTime = new TimeZone(TimeZoneOffset.positive(1), 'WAT');
  static readonly WesternEuropeanSummerTime = new TimeZone(TimeZoneOffset.positive(1), 'WEST');
  static readonly WesternEuropeanTime = new TimeZone(TimeZoneOffset.positive(0), 'WET');
  static readonly WesternIndonesianTime = new TimeZone(TimeZoneOffset.positive(7), 'WIT');
  static readonly WesternStandardTime = new TimeZone(TimeZoneOffset.positive(8), 'WST');
  static readonly YakutskTime = new TimeZone(TimeZoneOffset.positive(9), 'YAKT');
  static readonly YekaterinburgTime = new TimeZone(TimeZoneOffset.positive(5), 'YEKT');

  /**
   * Gets time zone offset.
   * @since 0.14.1
   * @author Alex Chugaev
   */
  readonly offset: TimeZoneOffset;

  /**
   * Gets time zone abbreviation.
   * @since 0.14.1
   * @author Alex Chugaev
   */
  readonly abbreviation?: string;

  /**
   * Gets time zone name.
   * @since 0.14.1
   * @author Alex Chugaev
   */
  readonly name?: string;

  /**
   * Initializes new instance with custom time zone offset and code.
   * @param offset Time zone offset.
   * @param abbreviation Time zone code.
   * @param name Time zone name.
   * @since 0.14.1
   * @author Alex Chugaev
   */
  constructor(offset: TimeZoneOffset, abbreviation?: string, name?: string) {
    this.offset = offset;
    this.abbreviation = abbreviation;
    this.name = name;
  }

  equals(other: TimeZone): boolean {
    return MultiValueEquals([
      [this.abbreviation, other.abbreviation, StrictEquals],
      [this.offset, other.offset, EquatableEquals]
    ]);
  }
}
