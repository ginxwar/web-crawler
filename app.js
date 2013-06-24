var $ = require('cheerio'),
    request = require('request'),
    _ = require('underscore'),
    async = require('async'),
    fs = require('fs');

//where we placed our results
var results = [];

var URLsSmall = [
    {
        "program": "Intensive Spanish Language, Univ. of Belgrano - Fall",
        "url": "http://www.eap.ucop.edu/Participants/argentina/Pages/1213_intensive_spanish_fall.aspx"
    },
    {
        "program": "Intensive Spanish Language, Univ. of Belgrano - Spring",
        "url": "http://www.eap.ucop.edu/Participants/argentina/Pages/1213_intensive_spanish_spring.aspx"
    },
    {
        "program": "Latin American Studies, National Univ. of Tres de Febrero - Summer",
        "url": "http://www.eap.ucop.edu/Participants/argentina/Pages/1213_latin_american_studies_summer.aspx"
    },
    {
        "program": "Australian Universities - Fall",
        "url": "http://www.eap.ucop.edu/Participants/australia/Pages/1213_australia_universities_fall.aspx"
    },
    {
        "program": "Australian Universities - Spring",
        "url": "http://www.eap.ucop.edu/Participants/australia/Pages/1213_australia_universities_spring.aspx"
    },
    {
        "program": "Australian Universities - Year",
        "url": "http://www.eap.ucop.edu/Participants/australia/Pages/1213_australia_universities_year.aspx"
    },
    {
        "program": "International Summer School, Univ. of New South Wales - Summer",
        "url": "http://www.eap.ucop.edu/Participants/australia/Pages/1213_international_summer_school_unsw_summer.aspx"
    },
    {
        "program": "Marine Biology & Terrestrial Ecology, Univ. of Queensland - Fall",
        "url": "http://www.eap.ucop.edu/Participants/australia/Pages/1213_marine_biology_fall.aspx"
    },
    {
        "program": "The Story of Jews in German-Speaking Europe 500-2012, UCEAP Faculty Led - Summer - UC Faculty-Led: Glenn Levine, Germany",
        "url": "http://www.eap.ucop.edu/Participants/germany/Pages/1213_the_story_of_jews_summer.aspx"
    },
    {
        "program": "Univ. of the West Indies - Fall",
        "url": "http://www.eap.ucop.edu/Participants/barbados/Pages/1213_univ_west_indies_fall.aspx"
    },
    {
        "program": "Univ. of the West Indies - Spring",
        "url": "http://www.eap.ucop.edu/Participants/barbados/Pages/1213_univ_west_indies_spring.aspx"
    }
  ];
  
var URLsMaster = [
    {
        "program": "Intensive Spanish Language, Univ. of Belgrano - Fall",
        "url": "http://www.eap.ucop.edu/Participants/argentina/Pages/1213_intensive_spanish_fall.aspx"
    },
    {
        "program": "Intensive Spanish Language, Univ. of Belgrano - Spring",
        "url": "http://www.eap.ucop.edu/Participants/argentina/Pages/1213_intensive_spanish_spring.aspx"
    },
    {
        "program": "Latin American Studies, National Univ. of Tres de Febrero - Summer",
        "url": "http://www.eap.ucop.edu/Participants/argentina/Pages/1213_latin_american_studies_summer.aspx"
    },
    {
        "program": "Australian Universities - Fall",
        "url": "http://www.eap.ucop.edu/Participants/australia/Pages/1213_australia_universities_fall.aspx"
    },
    {
        "program": "Australian Universities - Spring",
        "url": "http://www.eap.ucop.edu/Participants/australia/Pages/1213_australia_universities_spring.aspx"
    },
    {
        "program": "Australian Universities - Year",
        "url": "http://www.eap.ucop.edu/Participants/australia/Pages/1213_australia_universities_year.aspx"
    },
    {
        "program": "International Summer School, Univ. of New South Wales - Summer",
        "url": "http://www.eap.ucop.edu/Participants/australia/Pages/1213_international_summer_school_unsw_summer.aspx"
    },
    {
        "program": "Marine Biology & Terrestrial Ecology, Univ. of Queensland - Fall",
        "url": "http://www.eap.ucop.edu/Participants/australia/Pages/1213_marine_biology_fall.aspx"
    },
    {
        "program": "The Story of Jews in German-Speaking Europe 500-2012, UCEAP Faculty Led - Summer - UC Faculty-Led: Glenn Levine, Germany",
        "url": "http://www.eap.ucop.edu/Participants/germany/Pages/1213_the_story_of_jews_summer.aspx"
    },
    {
        "program": "Univ. of the West Indies - Fall",
        "url": "http://www.eap.ucop.edu/Participants/barbados/Pages/1213_univ_west_indies_fall.aspx"
    },
    {
        "program": "Univ. of the West Indies - Spring",
        "url": "http://www.eap.ucop.edu/Participants/barbados/Pages/1213_univ_west_indies_spring.aspx"
    },
    {
        "program": "Univ. of the West Indies - Year",
        "url": "http://www.eap.ucop.edu/Participants/barbados/Pages/1213_univ_west_indies_year.aspx"
    },
    {
        "program": "Univ. of Botswana - Fall",
        "url": "http://www.eap.ucop.edu/Participants/botswana/Pages/1213_univ_botswana_fall.aspx"
    },
    {
        "program": "Pontifical Catholic Univ. of Rio de Janeiro (PUC) - Fall",
        "url": "http://www.eap.ucop.edu/Participants/brazil/Pages/1213_pontifical_catholic_univ_fall.aspx"
    },
    {
        "program": "Pontifical Catholic Univ. of Rio de Janeiro (PUC) - Spring",
        "url": "http://www.eap.ucop.edu/Participants/brazil/Pages/1213_pontifical_catholic_univ_spring.aspx"
    },
    {
        "program": "Pontifical Catholic Univ. of Rio de Janeiro (PUC) - Year",
        "url": "http://www.eap.ucop.edu/Participants/brazil/Pages/1213_pontifical_catholic_univ_year.aspx"
    },
    {
        "program": "Univ. of British Columbia - Fall",
        "url": "http://www.eap.ucop.edu/Participants/canada/Pages/1213_univ_british_columbia_fall.aspx"
    },
    {
        "program": "Univ. of British Columbia - Year",
        "url": "http://www.eap.ucop.edu/Participants/canada/Pages/1213_univ_british_columbia_year.aspx"
    },
    {
        "program": "Chilean Universities - Fall",
        "url": "http://www.eap.ucop.edu/Participants/chile/Pages/1213_chile_universities_fall.aspx"
    },
    {
        "program": "Chilean Universities - Spring",
        "url": "http://www.eap.ucop.edu/Participants/chile/Pages/1213_chile_universities_spring.aspx"
    },
    {
        "program": "Chilean Universities - Year",
        "url": "http://www.eap.ucop.edu/Participants/chile/Pages/1213_chile_universities_year.aspx"
    },
    {
        "program": "Beijing Normal Univ. - Fall",
        "url": "http://www.eap.ucop.edu/Participants/china/Pages/1213_beijing_normal_univ_fall.aspx"
    },
    {
        "program": "Elementary Chinese, Beijing Normal Univ. - Summer",
        "url": "http://www.eap.ucop.edu/Participants/china/Pages/1213_elementary_chinese_BNU_summer.aspx"
    },
    {
        "program": "Fudan Univ. - Spring",
        "url": "http://www.eap.ucop.edu/Participants/china/Pages/1213_fudan_univ_spring.aspx"
    },
    {
        "program": "International Studies, Joint UC-Fudan Univ. (JPIS) - ECNU Summer + JPIS Fall",
        "url": "http://www.eap.ucop.edu/Participants/china/Pages/1213_intl_studies_ECNU_summer_JPIS_fall.aspx"
    },
    {
        "program": "International Studies, Joint UC-Fudan Univ. (JPIS) - Fall",
        "url": "http://www.eap.ucop.edu/Participants/china/Pages/1213_intl_studies_JPIS_fall.aspx"
    },
    {
        "program": "International Summer School, Peking Univ. - Summer",
        "url": "http://www.eap.ucop.edu/Participants/china/Pages/1213_intl_school_peking_univ_summer.aspx"
    },
    {
        "program": "Language & Culture, Beijing Normal Univ. - Summer",
        "url": "http://www.eap.ucop.edu/Participants/china/Pages/1213_language_culture_BNU_summer.aspx"
    },
    {
        "program": "Language & Culture, East China Normal Univ. - Summer",
        "url": "http://www.eap.ucop.edu/Participants/china/Pages/1213_language_culture_ECNU_summer.aspx"
    },
    {
        "program": "Materials Research Lab, Fudan Univ. - Summer",
        "url": "http://www.eap.ucop.edu/Participants/china/Pages/1213_materials_research_fudan_summer.aspx"
    },
    {
        "program": "MBA Studies, Fudan Univ. - Fall",
        "url": "http://www.eap.ucop.edu/Participants/china/Pages/1213_mba_studies_fudan_fall.aspx"
    },
    {
        "program": "Peking Univ. - Spring",
        "url": "http://www.eap.ucop.edu/Participants/china/Pages/1213_peking_univ_spring.aspx"
    },
    {
        "program": "Peking Univ. - Year",
        "url": "http://www.eap.ucop.edu/Participants/china/Pages/1213_peking_univ_year.aspx"
    },
    {
        "program": "Tsinghua Univ. - Spring",
        "url": "http://www.eap.ucop.edu/Participants/china/Pages/1213_tsinghua_univ_spring.aspx"
    },
    {
        "program": "Tropical Biology & Conservation, Monteverde Institute (Quarter) - Fall Quarter",
        "url": "http://www.eap.ucop.edu/Participants/costa_rica/Pages/1213_tropical_biology_fall_quarter.aspx"
    },
    {
        "program": "Tropical Biology & Conservation, Monteverde Institute (Quarter) - Spring Quarter",
        "url": "http://www.eap.ucop.edu/Participants/costa_rica/Pages/1213_tropical_biology_spring_quarter.aspx"
    },
    {
        "program": "Tropical Biology & Conservation, Monteverde Institute (Semester) - Fall Semester",
        "url": "http://www.eap.ucop.edu/Participants/costa_rica/Pages/1213_tropical_biology_fall_semester.aspx"
    },
    {
        "program": "Tropical Biology & Conservation, Monteverde Institute (Semester) - Spring Semester",
        "url": "http://www.eap.ucop.edu/Participants/costa_rica/Pages/1213_tropical_biology_spring_semester.aspx"
    },
    {
        "program": "The Story of Jews in German-Speaking Europe 500-2012, UCEAP Faculty Led - Summer - UC Faculty-Led: Glenn Levine, Germany",
        "url": "http://www.eap.ucop.edu/Participants/germany/Pages/1213_the_story_of_jews_summer.aspx"
    },
    {
        "program": "Univ. of Copenhagen - Fall",
        "url": "http://www.eap.ucop.edu/Participants/denmark/Pages/1213_univ_copenhagen_fall.aspx"
    },
    {
        "program": "Univ. of Copenhagen - Spring",
        "url": "http://www.eap.ucop.edu/Participants/denmark/Pages/1213_univ_copenhagen_spring.aspx"
    },
    {
        "program": "Univ. of Copenhagen - Year",
        "url": "http://www.eap.ucop.edu/Participants/denmark/Pages/1213_univ_copenhagen_year.aspx"
    },
    {
        "program": "American Univ. in Cairo - Fall",
        "url": "http://www.eap.ucop.edu/Participants/egypt/Pages/1213_american_univ_cairo_fall.aspx"
    },
    {
        "program": "American Univ. in Cairo - Spring",
        "url": "http://www.eap.ucop.edu/Participants/egypt/Pages/1213_american_univ_cairo_spring.aspx"
    },
    {
        "program": "American Univ. in Cairo - Year",
        "url": "http://www.eap.ucop.edu/Participants/egypt/Pages/1213_american_univ_cairo_year.aspx"
    },
    {
        "program": "21st Century Technologies & the Digital Divide, UCEAP Faculty Led - Summer - UC Faculty-Led: Isaac Scherson, France",
        "url": "http://www.eap.ucop.edu/Participants/france/Pages/1213_21_century_technologies_summer.aspx"
    },
    {
        "program": "French & European Studies, UC Center Paris - Fall",
        "url": "http://www.eap.ucop.edu/Participants/france/Pages/1213_french_european_studies_paris_fall.aspx"
    },
    {
        "program": "Language & Culture, UC Center Paris - Summer",
        "url": "http://www.eap.ucop.edu/Participants/france/Pages/1213_language_culture_paris_summer.aspx"
    },
    {
        "program": "Language & Culture, Univ. of Bordeaux - Fall",
        "url": "http://www.eap.ucop.edu/Participants/france/Pages/1213_language_culture_univ_bordeaux_fall.aspx"
    },
    {
        "program": "Language & Culture, Univ. of Lyon - Fall",
        "url": "http://www.eap.ucop.edu/Participants/france/Pages/1213_language_culture_univ_lyon_fall.aspx"
    },
    {
        "program": "Paris Center for Critical Studies - Fall",
        "url": "http://www.eap.ucop.edu/Participants/france/Pages/1213_paris_critical_studies_fall.aspx"
    },
    {
        "program": "Paris Center for Critical Studies - Spring",
        "url": "http://www.eap.ucop.edu/Participants/france/Pages/1213_paris_critical_studies_spring.aspx"
    },
    {
        "program": "Perspectives on the Global City, London & Paris (Quarter) - Spring (London to Paris)",
        "url": "http://www.eap.ucop.edu/Participants/united_kingdom_england/Pages/1213_perspectives_global_city_quarter_london_to_paris_spring.aspx"
    },
    {
        "program": "Political Science, Sciences Po - Spring",
        "url": "http://www.eap.ucop.edu/Participants/france/Pages/1213_sciences_po_spring.aspx"
    },
    {
        "program": "Political Science, Sciences Po - Year",
        "url": "http://www.eap.ucop.edu/Participants/france/Pages/1213_sciences_po_year.aspx"
    },
    {
        "program": "Univ. of Bordeaux - Fall",
        "url": "http://www.eap.ucop.edu/Participants/france/Pages/1213_univ_bordeaux_fall.aspx"
    },
    {
        "program": "Univ. of Bordeaux - Spring",
        "url": "http://www.eap.ucop.edu/Participants/france/Pages/1213_univ_bordeaux_spring.aspx"
    },
    {
        "program": "Univ. of Bordeaux - Year",
        "url": "http://www.eap.ucop.edu/Participants/france/Pages/1213_univ_bordeaux_year.aspx"
    },
    {
        "program": "Univ. of Lyon - Fall",
        "url": "http://www.eap.ucop.edu/Participants/france/Pages/1213_univ_lyon_fall.aspx"
    },
    {
        "program": "Univ. of Lyon - Year",
        "url": "http://www.eap.ucop.edu/Participants/france/Pages/1213_univ_lyon_year.aspx"
    },
    {
        "program": "European Studies, Free Univ. Berlin (BEST) - Fall",
        "url": "http://www.eap.ucop.edu/Participants/germany/Pages/1213_european_studies_berlin_fall.aspx"
    },
    {
        "program": "European Studies, Free Univ. Berlin (BEST) - Spring",
        "url": "http://www.eap.ucop.edu/Participants/germany/Pages/1213_european_studies_berlin_spring.aspx"
    },
    {
        "program": "Free Univ. Berlin - Fall",
        "url": "http://www.eap.ucop.edu/Participants/germany/Pages/1213_free_univ_berlin_fall.aspx"
    },
    {
        "program": "Free Univ. Berlin - Pre-ILP + Fall",
        "url": "http://www.eap.ucop.edu/Participants/germany/Pages/1213_free_univ_berlin_pre-ILP___fall.aspx"
    },
    {
        "program": "Free Univ. Berlin - Pre-ILP + Spring",
        "url": "http://www.eap.ucop.edu/Participants/germany/Pages/1213_free_univ_berlin_pre-ILP___spring.aspx"
    },
    {
        "program": "Free Univ. Berlin - Pre-ILP + Year",
        "url": "http://www.eap.ucop.edu/Participants/germany/Pages/1213_free_univ_berlin_pre-ILP___year.aspx"
    },
    {
        "program": "Free Univ. Berlin - Spring",
        "url": "http://www.eap.ucop.edu/Participants/germany/Pages/1213_free_univ_berlin_spring.aspx"
    },
    {
        "program": "Free Univ. Berlin - Spring (advanced only)",
        "url": "http://www.eap.ucop.edu/Participants/germany/Pages/1213_free_univ_berlin_spring_advanced.aspx"
    },
    {
        "program": "Free Univ. Berlin - Year",
        "url": "http://www.eap.ucop.edu/Participants/germany/Pages/1213_free_univ_berlin_year.aspx"
    },
    {
        "program": "Humboldt Univ. Berlin - Pre-ILP + Fall",
        "url": "http://www.eap.ucop.edu/Participants/germany/Pages/1213_humboldt_univ_berlin_pre-ILP___fall.aspx"
    },
    {
        "program": "Humboldt Univ. Berlin - Pre-ILP + Spring",
        "url": "http://www.eap.ucop.edu/Participants/germany/Pages/1213_humboldt_univ_berlin_pre-ILP___spring.aspx"
    },
    {
        "program": "Humboldt Univ. Berlin - Pre-ILP + Year",
        "url": "http://www.eap.ucop.edu/Participants/germany/Pages/1213_humboldt_univ_berlin_pre-ILP___year.aspx"
    },
    {
        "program": "Humboldt Univ. Berlin - Spring",
        "url": "http://www.eap.ucop.edu/Participants/germany/Pages/1213_humboldt_univ_berlin_spring.aspx"
    },
    {
        "program": "Humboldt Univ. Berlin - Spring (advanced only)",
        "url": "http://www.eap.ucop.edu/Participants/germany/Pages/1213_humboldt_univ_berlin_spring_advanced.aspx"
    },
    {
        "program": "Humboldt Univ. Berlin - Year",
        "url": "http://www.eap.ucop.edu/Participants/germany/Pages/1213_humboldt_univ_berlin_year.aspx"
    },
    {
        "program": "International Summer School, Free Univ. Berlin - Summer",
        "url": "http://www.eap.ucop.edu/Participants/germany/Pages/1213_intl_school_free_univ_berlin_summer.aspx"
    },
    {
        "program": "Language & Culture, Univ. of Potsdam - Spring",
        "url": "http://www.eap.ucop.edu/Participants/germany/Pages/1213_language_culture_potsdam_spring.aspx"
    },
    {
        "program": "Religion, Secularism, & Civil Societies, UCEAP Faculty Led - Summer - UC Faculty-Led: Vivian Nyitray, The Netherlands",
        "url": "http://www.eap.ucop.edu/Participants/netherlands/Pages/1213_religion_secularism_civil_societies_summer.aspx"
    },
    {
        "program": "Technical Univ. Berlin - Fall",
        "url": "http://www.eap.ucop.edu/Participants/germany/Pages/1213_technical_univ_berlin_fall.aspx"
    },
    {
        "program": "Technical Univ. Berlin - Spring",
        "url": "http://www.eap.ucop.edu/Participants/germany/Pages/1213_technical_univ_berlin_spring.aspx"
    },
    {
        "program": "Technical Univ. Berlin - Year",
        "url": "http://www.eap.ucop.edu/Participants/germany/Pages/1213_technical_univ_berlin_year.aspx"
    },
    {
        "program": "The Story of Jews in German-Speaking Europe 500-2012, UCEAP Faculty Led - Summer - UC Faculty-Led: Glenn Levine, Germany",
        "url": "http://www.eap.ucop.edu/Participants/germany/Pages/1213_the_story_of_jews_summer.aspx"
    },
    {
        "program": "Univ. of Ghana - Fall",
        "url": "http://www.eap.ucop.edu/Participants/ghana/Pages/1213_univ_ghana_fall.aspx"
    },
    {
        "program": "Univ. of Ghana - Spring",
        "url": "http://www.eap.ucop.edu/Participants/ghana/Pages/1213_univ_ghana_spring.aspx"
    },
    {
        "program": "Univ. of Ghana - Year",
        "url": "http://www.eap.ucop.edu/Participants/ghana/Pages/1213_univ_ghana_year.aspx"
    },
    {
        "program": "Business, Hong Kong Univ. of Science & Technology (HKUST) - Fall",
        "url": "http://www.eap.ucop.edu/Participants/hong_kong/Pages/1213_business_HKUST_fall.aspx"
    },
    {
        "program": "Business, Hong Kong Univ. of Science & Technology (HKUST) - Year",
        "url": "http://www.eap.ucop.edu/Participants/hong_kong/Pages/1213_business_HKUST_year.aspx"
    },
    {
        "program": "Chinese Univ. of Hong Kong (CUHK) - Fall",
        "url": "http://www.eap.ucop.edu/Participants/hong_kong/Pages/1213_CUHK_fall.aspx"
    },
    {
        "program": "Chinese Univ. of Hong Kong (CUHK) - Spring",
        "url": "http://www.eap.ucop.edu/Participants/hong_kong/Pages/1213_CUHK_spring.aspx"
    },
    {
        "program": "Chinese Univ. of Hong Kong (CUHK) - Year",
        "url": "http://www.eap.ucop.edu/Participants/hong_kong/Pages/1213_CUHK_year.aspx"
    },
    {
        "program": "Engineering, Hong Kong Univ. of Science & Technology  (HKUST) - Fall",
        "url": "http://www.eap.ucop.edu/Participants/hong_kong/Pages/1213_engineering_HKUST_fall.aspx"
    },
    {
        "program": "Engineering, Hong Kong Univ. of Science & Technology  (HKUST) - Year",
        "url": "http://www.eap.ucop.edu/Participants/hong_kong/Pages/1213_engineering_HKUST_year.aspx"
    },
    {
        "program": "Hong Kong Polytechnic Univ. - Fall",
        "url": "http://www.eap.ucop.edu/Participants/hong_kong/Pages/1213_HK_polytechnic_fall.aspx"
    },
    {
        "program": "Hong Kong Polytechnic Univ. - Year",
        "url": "http://www.eap.ucop.edu/Participants/hong_kong/Pages/1213_HK_polytechnic_year.aspx"
    },
    {
        "program": "MBA Studies, Chinese Univ. of Hong Kong (CUHK) - Fall",
        "url": "http://www.eap.ucop.edu/Participants/hong_kong/Pages/1213_MBA_studies_CUHK_fall.aspx"
    },
    {
        "program": "Science, Hong Kong Univ. of Science & Technology (HKUST) - Fall",
        "url": "http://www.eap.ucop.edu/Participants/hong_kong/Pages/1213_science_HKUST_fall.aspx"
    },
    {
        "program": "Science, Hong Kong Univ. of Science & Technology (HKUST) - Year",
        "url": "http://www.eap.ucop.edu/Participants/hong_kong/Pages/1213_science_HKUST_year.aspx"
    },
    {
        "program": "Univ. of Hong Kong (HKU) - Fall",
        "url": "http://www.eap.ucop.edu/Participants/hong_kong/Pages/1213_HKU_fall.aspx"
    },
    {
        "program": "Univ. of Hong Kong (HKU) - Spring",
        "url": "http://www.eap.ucop.edu/Participants/hong_kong/Pages/1213_HKU_spring.aspx"
    },
    {
        "program": "Univ. of Hong Kong (HKU) - Year",
        "url": "http://www.eap.ucop.edu/Participants/hong_kong/Pages/1213_HKU_year.aspx"
    },
    {
        "program": "UC Explores New Delhi - Fall - Institute for the International Education of Students (IES), Delhi",
        "url": "http://www.eap.ucop.edu/Participants/india/Pages/1213_uc_explores_new_delhi_fall.aspx"
    },
    {
        "program": "Univ. of Hyderabad - Fall",
        "url": "http://www.eap.ucop.edu/Participants/india/Pages/1213_univ_hyderabad_fall.aspx"
    },
    {
        "program": "Irish Universities - Fall",
        "url": "http://www.eap.ucop.edu/Participants/ireland/Pages/1213_irish_universities_fall.aspx"
    },
    {
        "program": "Irish Universities - Spring",
        "url": "http://www.eap.ucop.edu/Participants/ireland/Pages/1213_irish_universities_spring.aspx"
    },
    {
        "program": "Irish Universities - Year",
        "url": "http://www.eap.ucop.edu/Participants/ireland/Pages/1213_irish_universities_year.aspx"
    },
    {
        "program": "The Hebrew Univ. of Jerusalem - Fall",
        "url": "http://www.eap.ucop.edu/Participants/israel/Pages/1213_hebrew_univ_jerusalem_fall.aspx"
    },
    {
        "program": "The Hebrew Univ. of Jerusalem - Spring",
        "url": "http://www.eap.ucop.edu/Participants/israel/Pages/1213_hebrew_univ_jerusalem_spring.aspx"
    },
    {
        "program": "The Hebrew Univ. of Jerusalem - Year",
        "url": "http://www.eap.ucop.edu/Participants/israel/Pages/1213_hebrew_univ_jerusalem_year.aspx"
    },
    {
        "program": "Business & Economics, Univ. of Commerce Luigi Bocconi - Fall",
        "url": "http://www.eap.ucop.edu/Participants/italy/Pages/1213_bus_econ_bocconi_fall.aspx"
    },
    {
        "program": "Business & Economics, Univ. of Commerce Luigi Bocconi - Spring",
        "url": "http://www.eap.ucop.edu/Participants/italy/Pages/1213_bus_econ_bocconi_spring.aspx"
    },
    {
        "program": "Business & Economics, Univ. of Commerce Luigi Bocconi - Year",
        "url": "http://www.eap.ucop.edu/Participants/italy/Pages/1213_bus_econ_bocconi_year.aspx"
    },
    {
        "program": "European Transformations, UC Centers Madrid & Rome (Quarter) - Spring (Madrid to Rome)",
        "url": "http://www.eap.ucop.edu/Participants/italy/Pages/1213_EU_transformations_madrid_rome_quarter.aspx"
    },
    {
        "program": "European Transformations, UC Centers Madrid & Rome (Quarter) - Spring (Rome to Madrid)",
        "url": "http://www.eap.ucop.edu/Participants/italy/Pages/1213_EU_transformations_rome_madrid_quarter.aspx"
    },
    {
        "program": "European Transformations, UC Centers Madrid & Rome (Semester w/Internship) - Spring (Madrid to Rome)",
        "url": "http://www.eap.ucop.edu/Participants/italy/Pages/1213_EU_transformations_madrid_rome_semester.aspx"
    },
    {
        "program": "European Transformations, UC Centers Madrid & Rome (Semester w/Internship) - Spring (Rome to Madrid)",
        "url": "http://www.eap.ucop.edu/Participants/italy/Pages/1213_EU_transformations_rome_madrid_semester.aspx"
    },
    {
        "program": "Language & Culture, UC Center Florence (Quarter) - Summer",
        "url": "http://www.eap.ucop.edu/Participants/italy/Pages/1213_language_culture_florence_summer.aspx"
    },
    {
        "program": "Language & Culture, UC Center Florence (Semester) - Fall",
        "url": "http://www.eap.ucop.edu/Participants/italy/Pages/1213_language_culture_florence_fall.aspx"
    },
    {
        "program": "Language & Culture, UC Center Florence (Semester) - Spring",
        "url": "http://www.eap.ucop.edu/Participants/italy/Pages/1213_language_culture_florence_spring.aspx"
    },
    {
        "program": "Rome Through the Ages, UC Center Rome - Fall",
        "url": "http://www.eap.ucop.edu/Participants/italy/Pages/1213_UC_center_rome_fall.aspx"
    },
    {
        "program": "Rome Through the Ages, UC Center Rome - Spring",
        "url": "http://www.eap.ucop.edu/Participants/italy/Pages/1213_UC_center_rome_spring.aspx"
    },
    {
        "program": "Univ. of Bologna - Fall",
        "url": "http://www.eap.ucop.edu/Participants/italy/Pages/1213_univ_bologna_fall.aspx"
    },
    {
        "program": "Univ. of Bologna - Pre-ILP + Fall",
        "url": "http://www.eap.ucop.edu/Participants/italy/Pages/1213_univ_bologna_pre-ILP___fall.aspx"
    },
    {
        "program": "Univ. of Bologna - Pre-ILP + Year",
        "url": "http://www.eap.ucop.edu/Participants/italy/Pages/1213_univ_bologna_pre-ILP___year.aspx"
    },
    {
        "program": "Univ. of Bologna - Spring",
        "url": "http://www.eap.ucop.edu/Participants/italy/Pages/1213_univ_bologna_spring.aspx"
    },
    {
        "program": "Univ. of Bologna - Year",
        "url": "http://www.eap.ucop.edu/Participants/italy/Pages/1213_univ_bologna_year.aspx"
    },
    {
        "program": "Beginning Japanese, Osaka Univ. - Summer",
        "url": "http://www.eap.ucop.edu/Participants/japan/Pages/1213_beginning_japanese_osaka_summer.aspx"
    },
    {
        "program": "Contemporary Japan, International Christian Univ. (Quarter) - Fall Quarter",
        "url": "http://www.eap.ucop.edu/Participants/japan/Pages/1213_contemporary_japan_ICU_fall_quarter.aspx"
    },
    {
        "program": "Contemporary Japan, International Christian Univ. (Semester) - Fall Semester",
        "url": "http://www.eap.ucop.edu/Participants/japan/Pages/1213_contemporary_japan_ICU_fall_semester.aspx"
    },
    {
        "program": "Engineering & Science in English, Tohoku Univ. - ILP + Year",
        "url": "http://www.eap.ucop.edu/Participants/japan/Pages/1213_engineering_science_english_tohoku_ilp_year.aspx"
    },
    {
        "program": "Engineering & Science in English, Tohoku Univ. - Spring",
        "url": "http://www.eap.ucop.edu/Participants/japan/Pages/1213_engineering_science_english_tohoku_spring.aspx"
    },
    {
        "program": "Engineering & Science in English, Tohoku Univ. - Year",
        "url": "http://www.eap.ucop.edu/Participants/japan/Pages/1213_engineering_science_english_tohoku_year.aspx"
    },
    {
        "program": "Global & International Studies, Meiji Gakuin Univ. - Fall",
        "url": "http://www.eap.ucop.edu/Participants/japan/Pages/1213_global_studies_meiji_gakuin_fall.aspx"
    },
    {
        "program": "Global & International Studies, Meiji Gakuin Univ. - Spring",
        "url": "http://www.eap.ucop.edu/Participants/japan/Pages/1213_global_studies_meiji_gakuin_spring.aspx"
    },
    {
        "program": "International Christian Univ. - ILP + Year",
        "url": "http://www.eap.ucop.edu/Participants/japan/Pages/1213__ICU_ilp_year.aspx"
    },
    {
        "program": "Japanese Universities - ILP + Year - Hitotsubashi University, Tokyo",
        "url": "http://www.eap.ucop.edu/Participants/japan/Pages/1213_Japanese_universities_year_hitotsubashi_univ.aspx"
    },
    {
        "program": "Japanese Universities - ILP + Year - Keio University",
        "url": "http://www.eap.ucop.edu/Participants/japan/Pages/1213_Japanese_universities_year_keio_univ.aspx"
    },
    {
        "program": "Japanese Universities - ILP + Year - Osaka University",
        "url": "http://www.eap.ucop.edu/Participants/japan/Pages/1213_Japanese_universities_year_osaka_univ.aspx"
    },
    {
        "program": "Japanese Universities - ILP + Year - Waseda University",
        "url": "http://www.eap.ucop.edu/Participants/japan/Pages/1213_Japanese_universities_year_waseda_univ.aspx"
    },
    {
        "program": "Lab Research, Engineering & Science, Osaka Univ. - Fall",
        "url": "http://www.eap.ucop.edu/Participants/japan/Pages/1213_lab_research_osaka_fall.aspx"
    },
    {
        "program": "Lab Research, Engineering & Science, Osaka Univ. - Spring",
        "url": "http://www.eap.ucop.edu/Participants/japan/Pages/1213_lab_research_osaka_spring.aspx"
    },
    {
        "program": "Language & Culture, Doshisha Univ. - Spring",
        "url": "http://www.eap.ucop.edu/Participants/japan/Pages/1213_language_culture_doshisha_univ_spring.aspx"
    },
    {
        "program": "Language & Culture, Tsuru Univ. - Fall",
        "url": "http://www.eap.ucop.edu/Participants/japan/Pages/1213_language_culture_tsuru_fall.aspx"
    },
    {
        "program": "International Summer School, Yonsei Univ. - Summer",
        "url": "http://www.eap.ucop.edu/Participants/korea/Pages/1213_intl_school_yonsei_univ_summer.aspx"
    },
    {
        "program": "Yonsei Univ. - Fall",
        "url": "http://www.eap.ucop.edu/Participants/korea/Pages/1213_yonsei_univ_fall.aspx"
    },
    {
        "program": "Yonsei Univ. - Spring",
        "url": "http://www.eap.ucop.edu/Participants/korea/Pages/1213_yonsei_univ_spring.aspx"
    },
    {
        "program": "Yonsei Univ. - Summer + Fall",
        "url": "http://www.eap.ucop.edu/Participants/korea/Pages/1213_yonsei_univ_summer_fall.aspx"
    },
    {
        "program": "Yonsei Univ. - Summer + Year",
        "url": "http://www.eap.ucop.edu/Participants/korea/Pages/1213_yonsei_univ_summer_year.aspx"
    },
    {
        "program": "Yonsei Univ. - Year",
        "url": "http://www.eap.ucop.edu/Participants/korea/Pages/1213_yonsei_univ_year.aspx"
    },
    {
        "program": "Field Research, UC Center Mexico City - Fall",
        "url": "http://www.eap.ucop.edu/Participants/mexico/Pages/1213_field_research_mexico_city_fall.aspx"
    },
    {
        "program": "National Autonomous Univ. of Mexico (UNAM) - Fall",
        "url": "http://www.eap.ucop.edu/Participants/mexico/Pages/1213_national_autonomous_univ_fall.aspx"
    },
    {
        "program": "National Autonomous Univ. of Mexico (UNAM) - Spring (Advanced)",
        "url": "http://www.eap.ucop.edu/Participants/mexico/Pages/1213_national_autonomous_univ_spring_advanced.aspx"
    },
    {
        "program": "National Autonomous Univ. of Mexico (UNAM) - Year",
        "url": "http://www.eap.ucop.edu/Participants/mexico/Pages/1213_national_autonomous_univ_year.aspx"
    },
    {
        "program": "21st Century Technologies & the Digital Divide, UCEAP Faculty Led - Summer - UC Faculty-Led: Isaac Scherson, France",
        "url": "http://www.eap.ucop.edu/Participants/france/Pages/1213_21_century_technologies_summer.aspx"
    },
    {
        "program": "Business & Economics, Maastricht Univ. - Fall",
        "url": "http://www.eap.ucop.edu/Participants/netherlands/Pages/1213_bus_econ_maastricht_fall.aspx"
    },
    {
        "program": "Business & Economics, Maastricht Univ. - Spring",
        "url": "http://www.eap.ucop.edu/Participants/netherlands/Pages/1213_bus_econ_maastricht_spring.aspx"
    },
    {
        "program": "Religion, Secularism, & Civil Societies, UCEAP Faculty Led - Summer - UC Faculty-Led: Vivian Nyitray, The Netherlands",
        "url": "http://www.eap.ucop.edu/Participants/netherlands/Pages/1213_religion_secularism_civil_societies_summer.aspx"
    },
    {
        "program": "Univ. College Maastricht - Fall",
        "url": "http://www.eap.ucop.edu/Participants/netherlands/Pages/1213_univ_college_maastricht_fall.aspx"
    },
    {
        "program": "Univ. College Maastricht - Spring",
        "url": "http://www.eap.ucop.edu/Participants/netherlands/Pages/1213_univ_college_maastricht_spring.aspx"
    },
    {
        "program": "Univ. College Maastricht - Year",
        "url": "http://www.eap.ucop.edu/Participants/netherlands/Pages/1213_univ_college_maastricht_year.aspx"
    },
    {
        "program": "Univ. College Utrecht - Fall",
        "url": "http://www.eap.ucop.edu/Participants/netherlands/Pages/1213_univ_college_utrecht_fall.aspx"
    },
    {
        "program": "Univ. College Utrecht - Spring",
        "url": "http://www.eap.ucop.edu/Participants/netherlands/Pages/1213_univ_college_utrecht_spring.aspx"
    },
    {
        "program": "Univ. College Utrecht - Year",
        "url": "http://www.eap.ucop.edu/Participants/netherlands/Pages/1213_univ_college_utrecht_year.aspx"
    },
    {
        "program": "Utrecht Univ. - Fall",
        "url": "http://www.eap.ucop.edu/Participants/netherlands/Pages/1213_utrecht_univ_fall.aspx"
    },
    {
        "program": "Utrecht Univ. - Spring",
        "url": "http://www.eap.ucop.edu/Participants/netherlands/Pages/1213_utrecht_univ_spring.aspx"
    },
    {
        "program": "Utrecht Univ. - Year",
        "url": "http://www.eap.ucop.edu/Participants/netherlands/Pages/1213_utrecht_univ_year.aspx"
    },
    {
        "program": "New Zealand Universities - Spring",
        "url": "http://www.eap.ucop.edu/Participants/new_zealand/Pages/1213_new_zealand_universities_spring.aspx"
    },
    {
        "program": "New Zealand Universities - Year",
        "url": "http://www.eap.ucop.edu/Participants/new_zealand/Pages/1213_new_zealand_universities_year.aspx"
    },
    {
        "program": "Russian Area Studies, St. Petersburg State Univ.  - Fall",
        "url": "http://www.eap.ucop.edu/Participants/russia/Pages/1213_russian_area_studies_st_petersburg_fall.aspx"
    },
    {
        "program": "Russian Area Studies, St. Petersburg State Univ.  - Spring",
        "url": "http://www.eap.ucop.edu/Participants/russia/Pages/1213_russian_area_studies_st_petersburg_spring.aspx"
    },
    {
        "program": "Russian Language, St. Petersburg State Univ. - Fall",
        "url": "http://www.eap.ucop.edu/Participants/russia/Pages/1213_russian_language_st_petersburg_fall.aspx"
    },
    {
        "program": "Russian Language, St. Petersburg State Univ. - Spring",
        "url": "http://www.eap.ucop.edu/Participants/russia/Pages/1213_russian_language_st_petersburg_spring.aspx"
    },
    {
        "program": "Russian Language, St. Petersburg State Univ. - Year",
        "url": "http://www.eap.ucop.edu/Participants/russia/Pages/1213_russian_language_st_petersburg_year.aspx"
    },
    {
        "program": "Summer Russian Area Studies, St. Petersburg State Univ. - Summer",
        "url": "http://www.eap.ucop.edu/Participants/russia/Pages/1213_russian_area_studies_st_petersburg_summer.aspx"
    },
    {
        "program": "Summer Russian Language, St. Petersburg State Univ. - Summer",
        "url": "http://www.eap.ucop.edu/Participants/russia/Pages/1213_russian_language_st_petersburg_summer.aspx"
    },
    {
        "program": "African & Development Studies, Dakar - Fall",
        "url": "http://www.eap.ucop.edu/Participants/senegal/Pages/1213_african_developmental_studies_dakar.aspx"
    },
    {
        "program": "Biodiversity, National Univ. of Singapore - Summer",
        "url": "http://www.eap.ucop.edu/Participants/singapore/Pages/1213_biodiversity_national_univ_singapore_summer.aspx"
    },
    {
        "program": "National Univ. of Singapore (NUS) - Fall",
        "url": "http://www.eap.ucop.edu/Participants/singapore/Pages/1213_national_univ_singapore_fall.aspx"
    },
    {
        "program": "National Univ. of Singapore (NUS) - Spring",
        "url": "http://www.eap.ucop.edu/Participants/singapore/Pages/1213_national_univ_singapore_spring.aspx"
    },
    {
        "program": "National Univ. of Singapore (NUS) - Year",
        "url": "http://www.eap.ucop.edu/Participants/singapore/Pages/1213_national_univ_singapore_year.aspx"
    },
    {
        "program": "Science & Engineering Internship, Agency for Science, Technology & Research - Summer Session 1",
        "url": "http://www.eap.ucop.edu/Participants/singapore/Pages/1213_science_engineering_internship_a_star_summer_1.aspx"
    },
    {
        "program": "Science & Engineering Internship, Agency for Science, Technology & Research - Summer Session 2",
        "url": "http://www.eap.ucop.edu/Participants/singapore/Pages/1213_science_engineering_internship_a_star_summer_2.aspx"
    },
    {
        "program": "Univ. of Cape Town - Fall",
        "url": "http://www.eap.ucop.edu/Participants/south_africa/Pages/1213_univ_cape_town_fall.aspx"
    },
    {
        "program": "Univ. of Cape Town - Spring",
        "url": "http://www.eap.ucop.edu/Participants/south_africa/Pages/1213_univ_cape_town_spring.aspx"
    },
    {
        "program": "Univ. of Cape Town - Year",
        "url": "http://www.eap.ucop.edu/Participants/south_africa/Pages/1213_univ_cape_town_year.aspx"
    },
    {
        "program": "Autonomous Univ. of Barcelona - Pre-ILP + Year",
        "url": "http://www.eap.ucop.edu/Participants/spain/Pages/1213_autonomous_univ_barcelona_preilp_year.aspx"
    },
    {
        "program": "Autonomous Univ. of Barcelona - Year",
        "url": "http://www.eap.ucop.edu/Participants/spain/Pages/1213_autonomous_univ_barcelona_year.aspx"
    },
    {
        "program": "Carlos III Univ. - Spring",
        "url": "http://www.eap.ucop.edu/Participants/spain/Pages/1213_carlos_III_univ.aspx"
    },
    {
        "program": "Complutense Univ. of Madrid - Fall",
        "url": "http://www.eap.ucop.edu/Participants/spain/Pages/1213_complutense_univ_madrid_fall.aspx"
    },
    {
        "program": "Complutense Univ. of Madrid - Pre-ILP + Fall",
        "url": "http://www.eap.ucop.edu/Participants/spain/Pages/1213_complutense_univ_madrid_preilp_fall.aspx"
    },
    {
        "program": "Complutense Univ. of Madrid - Pre-ILP + Year",
        "url": "http://www.eap.ucop.edu/Participants/spain/Pages/1213_complutense_univ_madrid_preilp_year.aspx"
    },
    {
        "program": "Complutense Univ. of Madrid - Year",
        "url": "http://www.eap.ucop.edu/Participants/spain/Pages/1213_complutense_univ_madrid_year.aspx"
    },
    {
        "program": "European Transformations, UC Centers Madrid & Rome (Quarter) - Spring (Madrid to Rome)",
        "url": "http://www.eap.ucop.edu/Participants/italy/Pages/1213_EU_transformations_madrid_rome_quarter.aspx"
    },
    {
        "program": "European Transformations, UC Centers Madrid & Rome (Quarter) - Spring (Rome to Madrid)",
        "url": "http://www.eap.ucop.edu/Participants/italy/Pages/1213_EU_transformations_rome_madrid_quarter.aspx"
    },
    {
        "program": "European Transformations, UC Centers Madrid & Rome (Semester w/Internship) - Spring (Madrid to Rome)",
        "url": "http://www.eap.ucop.edu/Participants/italy/Pages/1213_EU_transformations_madrid_rome_semester.aspx"
    },
    {
        "program": "European Transformations, UC Centers Madrid & Rome (Semester w/Internship) - Spring (Rome to Madrid)",
        "url": "http://www.eap.ucop.edu/Participants/italy/Pages/1213_EU_transformations_rome_madrid_semester.aspx"
    },
    {
        "program": "Hispanic Studies, Carlos III Univ. of Madrid  - Fall",
        "url": "http://www.eap.ucop.edu/Participants/spain/Pages/1213_hispanic_studies_carlos_III_fall.aspx"
    },
    {
        "program": "Hispanic Studies, Carlos III Univ. of Madrid  - Spring",
        "url": "http://www.eap.ucop.edu/Participants/spain/Pages/1213_hispanic_studies_carlos_III_spring.aspx"
    },
    {
        "program": "International Business Economics, Pompeu Fabra Univ. - Spring",
        "url": "http://www.eap.ucop.edu/Participants/spain/Pages/1213_pompeu_fabra_univ_spring.aspx"
    },
    {
        "program": "International Business Economics, Pompeu Fabra Univ. - Winter",
        "url": "http://www.eap.ucop.edu/Participants/spain/Pages/1213_pompeu_fabra_univ_winter.aspx"
    },
    {
        "program": "International Business Economics, Pompeu Fabra Univ. - Winter + Spring",
        "url": "http://www.eap.ucop.edu/Participants/spain/Pages/1213_pompeu_fabra_univ_winter_spring.aspx"
    },
    {
        "program": "Language & Culture, UC Center Madrid - Summer",
        "url": "http://www.eap.ucop.edu/Participants/spain/Pages/1213_language_culture_madrid_summer.aspx"
    },
    {
        "program": "Language & Culture, Univ. of Córdoba - Fall",
        "url": "http://www.eap.ucop.edu/Participants/spain/Pages/1213_language_culture_cordoba_fall.aspx"
    },
    {
        "program": "Language & Culture, Univ. of Córdoba - Spring",
        "url": "http://www.eap.ucop.edu/Participants/spain/Pages/1213_language_culture_cordoba_spring.aspx"
    },
    {
        "program": "Univ. of Barcelona - Pre-ILP + Year",
        "url": "http://www.eap.ucop.edu/Participants/spain/Pages/1213_univ_barcelona_preilp_year.aspx"
    },
    {
        "program": "Univ. of Barcelona - Spring",
        "url": "http://www.eap.ucop.edu/Participants/spain/Pages/1213_univ_barcelona_spring.aspx"
    },
    {
        "program": "Univ. of Barcelona - Year",
        "url": "http://www.eap.ucop.edu/Participants/spain/Pages/1213_univ_barcelona_year.aspx"
    },
    {
        "program": "Univ. of Granada - Fall",
        "url": "http://www.eap.ucop.edu/Participants/spain/Pages/1213_univ_granada_fall.aspx"
    },
    {
        "program": "Univ. of Granada - Pre-ILP + Fall",
        "url": "http://www.eap.ucop.edu/Participants/spain/Pages/1213_univ_granada_preilp_fall.aspx"
    },
    {
        "program": "Univ. of Granada - Pre-ILP + Year",
        "url": "http://www.eap.ucop.edu/Participants/spain/Pages/1213_univ_granada_preilp_year.aspx"
    },
    {
        "program": "Univ. of Granada - Year",
        "url": "http://www.eap.ucop.edu/Participants/spain/Pages/1213_univ_granada_year.aspx"
    },
    {
        "program": "Language & Culture, Lund Univ. - Summer",
        "url": "http://www.eap.ucop.edu/Participants/sweden/Pages/1213_language_culture_lund_summer.aspx"
    },
    {
        "program": "Lund Univ. - Fall",
        "url": "http://www.eap.ucop.edu/Participants/sweden/Pages/1213_lund_univ_fall.aspx"
    },
    {
        "program": "Lund Univ. - Spring",
        "url": "http://www.eap.ucop.edu/Participants/sweden/Pages/1213_lund_univ_spring.aspx"
    },
    {
        "program": "Lund Univ. - Summer L&C + Fall",
        "url": "http://www.eap.ucop.edu/Participants/sweden/Pages/1213_lund_univ_summer_L_C_fall.aspx"
    },
    {
        "program": "Lund Univ. - Summer L&C + Year",
        "url": "http://www.eap.ucop.edu/Participants/sweden/Pages/1213_lund_univ_summer_L_C_year.aspx"
    },
    {
        "program": "Lund Univ. - Year",
        "url": "http://www.eap.ucop.edu/Participants/sweden/Pages/1213_lund_univ_year.aspx"
    },
    {
        "program": "Language & Culture Summer Sessions, National Taiwan Normal Univ. - Summer",
        "url": "http://www.eap.ucop.edu/Participants/taiwan/Pages/1213_language_culture_ntnu_summer_session.aspx"
    },
    {
        "program": "Language & Culture, National Taiwan Normal Univ. - Fall",
        "url": "http://www.eap.ucop.edu/Participants/taiwan/Pages/1213_NTNU_language_culture_fall.aspx"
    },
    {
        "program": "Language & Culture, National Taiwan Normal Univ. - Summer + Fall",
        "url": "http://www.eap.ucop.edu/Participants/taiwan/Pages/1213_NTNU_language_culture_summer_fall.aspx"
    },
    {
        "program": "National Taiwan Univ. (NTU) - Fall",
        "url": "http://www.eap.ucop.edu/Participants/taiwan/Pages/1213_national_taiwan_univ_fall.aspx"
    },
    {
        "program": "National Taiwan Univ. (NTU) - Spring",
        "url": "http://www.eap.ucop.edu/Participants/taiwan/Pages/1213_national_taiwan_univ_spring.aspx"
    },
    {
        "program": "National Taiwan Univ. (NTU) - Year",
        "url": "http://www.eap.ucop.edu/Participants/taiwan/Pages/1213_national_taiwan_univ_year.aspx"
    },
    {
        "program": "African and Kiswahili Studies, Dar es Salaam - Spring",
        "url": "http://www.eap.ucop.edu/Participants/tanzania/Pages/1213_african_kiswahili_studies_spring.aspx"
    },
    {
        "program": "Interdisciplinary Thai Studies, Thammasat Univ. - Summer",
        "url": "http://www.eap.ucop.edu/Participants/thailand/Pages/1213_thai_studies_thammasat_univ_summer.aspx"
    },
    {
        "program": "Thammasat Univ. - Fall",
        "url": "http://www.eap.ucop.edu/Participants/thailand/Pages/1213_thammasat_univ_fall.aspx"
    },
    {
        "program": "Thammasat Univ. - Spring",
        "url": "http://www.eap.ucop.edu/Participants/thailand/Pages/1213_thammasat_univ_spring.aspx"
    },
    {
        "program": "Thammasat Univ. - Year",
        "url": "http://www.eap.ucop.edu/Participants/thailand/Pages/1213_thammasat_univ_year.aspx"
    },
    {
        "program": "Bilkent Univ. - Fall",
        "url": "http://www.eap.ucop.edu/Participants/turkey/Pages/1213_bilkent_univ_fall.aspx"
    },
    {
        "program": "Bilkent Univ. - Spring",
        "url": "http://www.eap.ucop.edu/Participants/turkey/Pages/1213_bilkent_univ_spring.aspx"
    },
    {
        "program": "Bilkent Univ. - Year",
        "url": "http://www.eap.ucop.edu/Participants/turkey/Pages/1213_bilkent_univ_year.aspx"
    },
    {
        "program": "Bogazici Univ. - Fall",
        "url": "http://www.eap.ucop.edu/Participants/turkey/Pages/1213_bogazici_univ_fall.aspx"
    },
    {
        "program": "Bogazici Univ. - Spring",
        "url": "http://www.eap.ucop.edu/Participants/turkey/Pages/1213_bogazici_univ_spring.aspx"
    },
    {
        "program": "Bogazici Univ. - Year",
        "url": "http://www.eap.ucop.edu/Participants/turkey/Pages/1213_bogazici_univ_year.aspx"
    },
    {
        "program": "International Summer School, Bogazici Univ. - Summer",
        "url": "http://www.eap.ucop.edu/Participants/turkey/Pages/1213_intl_summer_school_bogazici_univ.aspx"
    },
    {
        "program": "Koc Univ. - Fall",
        "url": "http://www.eap.ucop.edu/Participants/turkey/Pages/1213_koc_univ_fall.aspx"
    },
    {
        "program": "Middle East Technical Univ. - Fall",
        "url": "http://www.eap.ucop.edu/Participants/turkey/Pages/1213_middle_east_technical_univ_fall.aspx"
    },
    {
        "program": "Middle East Technical Univ. - Year",
        "url": "http://www.eap.ucop.edu/Participants/turkey/Pages/1213_middle_east_technical_univ_year.aspx"
    },
    {
        "program": "Arts, Politics, Society & Space, UC Center London     - Fall",
        "url": "http://www.eap.ucop.edu/Participants/united_kingdom_england/Pages/1213_arts_politics_society_space_UC_london.aspx"
    },
    {
        "program": "Immersion - United Kingdom Universities - Fall",
        "url": "http://www.eap.ucop.edu/Participants/united_kingdom_england/Pages/1213_UK_universities_fall.aspx"
    },
    {
        "program": "Immersion - United Kingdom Universities - Spring",
        "url": "http://www.eap.ucop.edu/Participants/united_kingdom_england/Pages/1213_UK_universities_spring.aspx"
    },
    {
        "program": "Immersion - United Kingdom Universities - Year",
        "url": "http://www.eap.ucop.edu/Participants/united_kingdom_england/Pages/1213_UK_universities_year.aspx"
    },
    {
        "program": "International Summer School, Pembroke/King's College, Univ. of Cambridge - Summer",
        "url": "http://www.eap.ucop.edu/Participants/united_kingdom_england/Pages/1213_intl_school_pembroke_summer.aspx"
    },
    {
        "program": "International Summer School, Univ. of Sussex - Summer",
        "url": "http://www.eap.ucop.edu/Participants/united_kingdom_england/Pages/1213_intl_school_sussex_summer.aspx"
    },
    {
        "program": "Perspectives on the Global City, London & Paris (Quarter) - Spring (London to Paris)",
        "url": "http://www.eap.ucop.edu/Participants/united_kingdom_england/Pages/1213_perspectives_global_city_quarter_london_to_paris_spring.aspx"
    },
    {
        "program": "Summer School, London School of Economics - Summer Session 1",
        "url": "http://www.eap.ucop.edu/Participants/united_kingdom_england/Pages/1213_london_school_economics_summer_1.aspx"
    },
    {
        "program": "Summer School, London School of Economics - Summer Session 1 + 2",
        "url": "http://www.eap.ucop.edu/Participants/united_kingdom_england/Pages/1213_london_school_economics_summer_1_and_2.aspx"
    },
    {
        "program": "Immersion - United Kingdom Universities - Fall",
        "url": "http://www.eap.ucop.edu/Participants/united_kingdom_england/Pages/1213_UK_universities_fall.aspx"
    },
    {
        "program": "Immersion - United Kingdom Universities - Spring",
        "url": "http://www.eap.ucop.edu/Participants/united_kingdom_england/Pages/1213_UK_universities_spring.aspx"
    },
    {
        "program": "Immersion - United Kingdom Universities - Year",
        "url": "http://www.eap.ucop.edu/Participants/united_kingdom_england/Pages/1213_UK_universities_year.aspx"
    },
    {
        "program": "Scottish Parliament Internship, UC Center Edinburgh - Fall",
        "url": "http://www.eap.ucop.edu/Participants/united_kingdom_scotland/Pages/1213_scottish_parliament_internship_fall.aspx"
    },
    {
        "program": "Scottish Parliament Internship, UC Center Edinburgh - Spring",
        "url": "http://www.eap.ucop.edu/Participants/united_kingdom_scotland/Pages/1213_scottish_parliament_internship_spring.aspx"
    },
    {
        "program": "Hanoi Univ. - Fall",
        "url": "http://www.eap.ucop.edu/Participants/vietnam/Pages/1213_hanoi_univ_fall.aspx"
    }
];



  
  
  
  
  
  var outputToConsole = function() {
    
    var sorted = _(results).sortBy(function(url){return url.index})
    
    
    console.log(JSON.stringify(sorted, null, 2));
    
    fs.writeFile('output.json', JSON.stringify(sorted, null, 2), function (err) {
      if (err) return console.log(err);
      //console.log('Hello World > helloworld.txt');
    });
    
    
  };
  
 
  
  var processURLs = function(URLArray, callback) {        
    
    var aryLength = URLArray.length;    
    console.log(aryLength + " total URLs to process");       
    
    _(URLArray).each(function( url, index, list ) {      
      
      var indexEach = index;
      
      var obj = {};
      obj["index"] = indexEach;
      obj["program"] = url.program;
      obj["url"] = url.url;    
      
      request(url.url, function( err, res, html ) {
        
        var parsedHTML = $.load(html);
        
        var startDate;  //populated later with ERROR or actual data
        
        parsedHTML("table[summary='Program Calendar'] strong").map(function(index, tag) {                    
          if (index === 1) {    //"second" bold statement in tr                                    
            startDate = $(tag).text();                        
          }
        });
        
        obj["startDate"] = (startDate || "ERROR");
        
        results.push(obj);
                
        --aryLength;
        
        console.log(aryLength + " URLs left to go");
        if (aryLength <= 0) {
          callback();
        }                   
      });  //request
      
    })  //each    
  };  //processURLs

  processURLs(URLsMaster, outputToConsole);