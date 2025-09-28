# Data Documentation - Data Gathering & Merging

## Overview
This folder contains documentation for the project datasets, including:
- Description of each region and its corresponding CSV files.
- Details of the script used to merge and organize the data.
- Explanation of CSV columns.
- Notes on the population data and extraction process.

---

## Data Sources

1. **NDVI, Climate, and Land Cover**  
   - Extracted from **Google Earth Engine (GEE)** using MODIS NDVI (MOD13A2), ERA5 climate data, and ESA WorldCover land cover dataset.  
   - Monthly data for each region was extracted using GEE, with sample points across the area.

2. **Population Data**  
   - Population raster data obtained from **WorldPop** (latest version, ~2025).  
   - Extracted and aligned to the same spatial points as the other datasets using GEE.

3. **Soil Data**  
   - Extracted from **SoilGrids (0-5 cm layer)**, including sand, silt, clay, soil organic carbon, pH, bulk density, and cation exchange capacity (CEC).  
   - The latest available layer that could be extracted was **from 2020**.  
   - This is generally acceptable because **soil properties do not change rapidly over short periods**, so using 2020 data does not significantly affect the analysis.

---

## Folder Structure

- Each region folder contains **monthly CSV files** sampled from GEE.  
- `combined_data.csv` contains **all regions merged** into a single dataset.
- `merge data Folder` contains the code to merge all data.
- `Regathering_Data_for_model Folder` contains scripts & data files after recombination data for the model and evaluate the website.
- `regathering_test_data.ipynb` This code file to gather and cotact test data.
- `regathering_train_data.ipynb` This code file to gather and cotact train data.
- `test_data.csv & train_data.csv` contains the data used for testing/ evalute the website and training the model.

---

## CSV File Structure

All CSV files contain the following columns:

| Column       | Description |
|--------------|------------|
| longitude    | Longitude of the sample point |
| latitude     | Latitude of the sample point |
| year         | Year of the observation |
| month        | Month of the observation |
| area         | Region name |
| ndvi         | Normalized Difference Vegetation Index (NDVI) from MODIS, range -1 to 1 |
| t2m_c        | Temperature at 2 meters (°C) |
| td2m_c       | Dewpoint temperature at 2 meters (°C) |
| rh_pct       | Relative humidity (%) |
| tp_m         | Total precipitation (meters) |
| ssrd_jm2     | Surface solar radiation downward (J/m²) |
| LC_Type1     | Land cover type from WorldCover |
| sand         | Soil sand fraction (%) |
| silt         | Soil silt fraction (%) |
| clay         | Soil clay fraction (%) |
| soc          | Soil organic carbon (%) |
| ph           | Soil pH |
| bdod         | Soil bulk density (g/cm³) |
| cec          | Soil cation exchange capacity (cmol/kg) |
| POP          | Population from WorldPop |

---

## Notes

- Each CSV file contains **randomly sampled points** within the region (it may vary depending on data availability).  
- Population data was extracted **using the same grid points as the other datasets** to ensure proper alignment.  
- All datasets were **pre-processed and merged** using the provided Python script (`merge_data.py`) to generate `combined_data.csv`.  
- The structure is designed to facilitate **easy analysis and modeling**.








