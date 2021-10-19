library(tidyverse)
library(dplyr)
# raw data
# https://www.kaggle.com/marianarfranklin/mexico-covid19-clinical-data
# 
df.covid_mexico.raw <- read.csv("http://raw.githubusercontent.com/marianarf/covid19_mexico_analysis/master/mexico_covid19.csv", 1)

# Select columns that will be used by the model
columns <- c("RESULTADO", "SEXO","FECHA_DEF","NEUMONIA","EDAD","EMBARAZO","DIABETES",      
             "ASMA","INMUSUPR","HIPERTENSION","CARDIOVASCULAR","OBESIDAD",    
             "TABAQUISMO")
df.covid_mexico <- df.covid_mexico.raw[columns]

# rename the remaining columns
names(df.covid_mexico) <- c("TestResult","Gender","DateOfDeath","Neumonia","Age","Pregnant","Diabetes",      
                    "Astma","ImmunoSuppressed","Hypertension","Cardiovascular","Obese","Smoking")

# 1 -> POSITIVE; 2 -> NEGATIVE; 97 -> N/A
# Gender 1 -> Female; 2 -> Male
boolean_columns = c("TestResult","Neumonia","Pregnant","Diabetes",      
  "Astma","ImmunoSuppressed","Hypertension","Cardiovascular","Obese","Smoking")
df.covid_mexico[boolean_columns] <- lapply(df.covid_mexico[boolean_columns], function(x) car::recode(x, "2=0;97=NA"))

df.covid_mexico$PatientOutcome <- ifelse(df.covid_mexico$DateOfDeath != "9999-99-99", 1,0)
df.covid_mexico <- within(df.covid_mexico, rm(DateOfDeath))
glimpse(df.covid_mexico)


# Questions

# How many people in total died?
nrow(filter(df.covid_mexico, PatientOutcome == 1)) #4542

# How many people not diagnosed with Covid still died?
nrow(filter(df.covid_mexico, TestResult == 0 & PatientOutcome == 1)) #1438

# Save the csv.

df.covid_mexico <- filter(df.covid_mexico, TestResult == 0)
df.covid_mexico <- within(df.covid_mexico, rm(TestResult))

# write.csv(df.covid_mexico, "mexico_covid19.csv", row.names = FALSE)

