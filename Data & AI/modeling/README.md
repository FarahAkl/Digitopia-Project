# 🌍 Desertification Modeling

This folder contains the initial modeling experiments for predicting **NDVI** (Normalized Difference Vegetation Index) using environmental, soil, and demographic data from five Egyptian governorates.

---

## 📊 Dataset

The dataset was collected from **Google Earth Engine (GEE)** and includes:

- Geographic coordinates: longitude, latitude  
- Temporal features: year, month → converted to **season**  
- NDVI (target variable)  
- Climate features: temperature, precipitation, humidity, solar radiation  
- Soil properties: sand, silt, clay, organic carbon, pH, cation exchange capacity (CEC), bulk density  
- Land cover type  
- Population  

🗂 **Governorates covered**:  
- Dakahlia  
- Fayoum  
- Matrouh  
- New Valley  
- North Sinai  

---

## 🛠 Preprocessing & Feature Engineering

1. **Data Cleaning**  
   - Removed duplicates  
   - Handled categorical variable: `area`  

2. **Feature Engineering**  
   - Created `season` feature from month  
   - Derived soil composition ratios: `sand_ratio`, `silt_ratio`, `clay_ratio`  
   - Combined fertility-related features: `soc_cec = soc × cec`  

3. **Feature Selection**  
   - Used **LightGBM feature importance**  
   - Dropped features with importance < 2%  
   - Finalized optimized feature set  

---

## 📈 Modeling Workflow

The following models were trained and compared:

1. **Linear Regression** (baseline)  
2. **LightGBM** (gradient boosting)  
3. **XGBoost** (tree boosting)  
4. **Averaging Ensemble** (mean of LR, LGBM, XGB predictions)  
5. **Stacking Regressor** (with Linear Regression as meta-learner)  
6. **Optuna-Tuned LightGBM** (best-performing optimized model)  

---

## 📊 Results

| Model                  | MSE    | RMSE   | R²    |
|-------------------------|--------|--------|-------|
| Linear Regression       | 0.0124 | 0.1115 | 0.7179 |
| LightGBM                | 0.0019 | 0.0437 | 0.9567 |
| XGBoost                 | 0.0022 | 0.0472 | 0.9494 |
| Averaging Ensemble      | 0.0035 | 0.0588 | 0.9217 |
| Stacking Ensemble       | 0.0026 | 0.0513 | 0.9403 |
| **Optuna-Tuned LightGBM ✅** | **0.0011** | **0.0336** | **0.9744** |

---

## 🏆 Key Findings

- **Optuna-Tuned LightGBM** achieved the **best performance** with the lowest error and highest R² (97.4%).  
- Ensemble models improved stability but did not outperform tuned LightGBM.  
- Linear Regression was weak compared to tree-based methods.  

---

## 💾 Model Saving

- Final best model: **Optuna-Tuned LightGBM**  
- Saved in two versions:  
  - `final_lightgbm_optuna_model.pkl`  
  - `model_compress3.pkl` (smaller size for GitHub upload)  

---

## 🚀 How to Run

1. Upload the dataset `des_df.csv` to Google Drive (path is set inside the notebook) & the data by its self we've saved it in **Data Gathering & Merging** folder.  
2. Open `Modeling.ipynb` in **Google Colab**.  
3. Run all cells sequentially.  
4. Trained models & results will be saved.  


