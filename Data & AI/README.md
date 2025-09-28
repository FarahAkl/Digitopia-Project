# 🌍 NDVI Desertification Prediction – Egypt

This repository contains the full workflow for predicting **NDVI (Normalized Difference Vegetation Index)** across selected Egyptian governorates using satellite, soil, and demographic data.  
It developed as part of Digitopia competition project to address **بصمة خضراء**.

---

## 📌 Project Workflow

1. **Data Gathering & Merging**  
   - Collected NDVI, climate, soil, land cover, and population data from **Google Earth Engine (GEE)** and **WorldPop**.  
   - Data prepared **per governorate** and merged into a combined dataset.  
   - Two strategies:  
     - **Old (Scripts/)** → Merged all 5 governorates together.  
     - **New (Regathering_Data_for_model/)** → Separate **train/test splits** to simulate unseen governorates.  

2. **Exploratory Data Analysis (EDA)**  
   - Conducted in [Desertification_Data_Analysis.ipynb](./Desertification_Data_Analysis.ipynb).  
   - Covered: NDVI distributions, rainfall correlation, population effects, soil & land cover patterns.  
   - Key insights: NDVI strongly seasonal, positively correlated with rainfall, and lower in high-population density/urbanized areas.  

3. **Modeling (Baseline)**  
   - Implemented in [modeling/Modeling.ipynb](./modeling/Modeling.ipynb).  
   - Trained models on all 5 governorates.  
   - Compared: **Linear Regression, LightGBM, XGBoost, Ensembles**.  
   - Best performance: **Optuna-tuned LightGBM**.  

4. **Remodeling (Final Model)**  
   - Implemented in [remodeling/remodel.ipynb](./remodeling/remodel.ipynb).  
   - Strategy: Train on **3 governorates** (Dakahlia, Fayoum, Matrouh), test on **2 unseen** (North Sinai, New Valley).  
   - Exported preprocessing pipeline + final model for API.  
   - Full docs in [remodeling/README.md](./remodeling/README.md).  

5. **AI API Integration**  
   - Built with **FastAPI** using saved `preprocessor.pkl` + `model.pkl`.  
   - API hosted on **Hugging Face Spaces** → endpoint responds to user `location` by:  
     - Extracting features from test dataset.  
     - Applying preprocessing + model to predict NDVI.  
     - Returning NDVI prediction + desertification risk + tailored recommendations (irrigation, soil, crops).  
   - Integrated into the **web platform**, tested successfully, and the website delivered correct predictions. 

   👉 [View Hugging Face API](https://huggingface.co/spaces/radwaamr1/desertification-api/tree/main)  

---

## 📂 Repository Structure

```plaintext
Data Gathering & Merging/            # Raw datasets per governorate & final data gathering
├── Dakahlia/
├── Fayoum/
├── Matrouh/
├── NewValley/
├── NorthSinai/
├── Regathering_Data_for_model/      # Final train/test gathering
│   ├── regathering_train_data.ipynb
│   ├── regathering_test_data.ipynb
│   ├── train_data.csv
│   └── test_data.csv
├── merge data/                      # Old merging strategy
│   ├── merge_data.ipynb
│   └── combined_data.csv
└── README.md                        # Documentation for data gathering & merging

modeling/                            # Baseline modeling experiments
├── Modeling.ipynb
└── README.md                        # Documentation for modeling

remodeling/                          # Final Optuna-tuned LightGBM pipeline
├── remodel.ipynb
├── README.md
├── feature_names.json
├── preprocessor.pkl
└── model pkl.docx

Desertification_Data_Analysis.ipynb  # Exploratory Data Analysis (EDA)

```

---

## 📊 Modeling Results

**Baseline (all 5 governorates)**  

| Model                | MSE    | RMSE   | R²     |
|-----------------------|--------|--------|--------|
| Linear Regression     | 0.0124 | 0.1115 | 0.7179 |
| LightGBM              | 0.0019 | 0.0437 | 0.9567 |
| XGBoost               | 0.0022 | 0.0472 | 0.9494 |
| Averaging Ensemble    | 0.0035 | 0.0588 | 0.9217 |
| Stacking Ensemble     | 0.0026 | 0.0513 | 0.9403 |
| **Optuna LightGBM**   | **0.0011** | **0.0336** | **0.9744** |

**Final Remodeling (3 train governorates, 2 test governorates)**  
- **MSE**: 0.001110  
- **RMSE**: 0.033316  
- **R²**: 0.970431  

✅ Confirms strong generalization on unseen regions.  

---

## 💾 Saved Artifacts

- [model pkl.docx](./remodeling/model%20pkl.docx) → Final trained LightGBM model (saved as `.docx` for GitHub upload)  
- [preprocessor.pkl](./remodeling/preprocessor.pkl) → Preprocessing pipeline (scaler + encoders)  
- [feature_names.json](./remodeling/feature_names.json) → Original feature names  
- [remodel.ipynb](./remodeling/remodel.ipynb) → Final modeling notebook  

---

## 🚀 Usage

To use the model:

```python
import joblib

# Load preprocessing and model
preprocessor = joblib.load("remodeling/preprocessor.pkl")
model = joblib.load("remodeling/model.pkl")

# Apply to new data
X_new_transformed = preprocessor.transform(X_new)
y_pred = model.predict(X_new_transformed)
```

---

## 🔗 Hugging Face API

We have deployed the trained model and full pipeline as an **API on Hugging Face Spaces**.  
You can explore the API files and interact with the endpoints here:  

👉 [View API on Hugging Face](https://huggingface.co/spaces/radwaamr1/desertification-api/tree/main)  

This API is already **integrated with our web platformn** for real-time NDVI predictions.  

---

## 📌 Future Work

- Expand dataset to include **more governorates** and wider geographic coverage across Egypt.  
- Support **batch data processing** for large-scale predictions.  
- Implement **streaming data pipelines** for continuous updates.  
- Add advanced features like **multi-year desertification forecasting** for specific regions.  
- Enhance website functionality with additional features to strengthen prediction and usability.  

