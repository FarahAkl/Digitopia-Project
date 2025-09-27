# 🔄 Remodeling

This folder contains the **final modeling workflow** after adjusting the training strategy to optimize performance for a web-based platform.

---

## 📌 Purpose

The initial modeling used all five governorates for training, but the website integration required a split to **simulate unseen regions**. Therefore, the data was divided as follows:

- **Training governorates (for training model)**: 3 Governates(Dakahlia, Fayoum, Matrouh)  
- **Testing governorates (for testing the website)**: 2 Governates(North Sinai, New Valley)  

This ensures that the model is trained on part of Egypt and tested on completely different governorates to evaluate its generalization ability.

---

## 📊 Dataset

The dataset (from **Google Earth Engine**) contains:

- **Target**: NDVI (Normalized Difference Vegetation Index)  
- **Geographic**: longitude, latitude, year, month → `season`  
- **Climate**: temperature, dewpoint, humidity, precipitation, solar radiation  
- **Soil**: sand, silt, clay, organic carbon, pH, bulk density, cation exchange capacity (CEC)  
- **Derived features**: soil ratios (sand, silt, clay), combined fertility feature (`soc_cec`)  
- **Land cover** and **Population**  

For details on data gathering, see [regathering.ipynb](./regathering.ipynb).

---

## 🛠 Preprocessing

1. Added `season` feature from month  
2. Calculated soil ratios: `sand_ratio`, `silt_ratio`, `clay_ratio`  
3. Combined fertility: `soc_cec = soc × cec`  
4. Applied scaling to numeric features and One-Hot Encoding to categorical features (`season`, `area`)  
5. Built a preprocessing pipeline with `ColumnTransformer`  

🔗 Preprocessing pipeline saved as [preprocessor.pkl](./preprocessor.pkl).  
🔗 Final feature names saved in [feature_names.json](./feature_names.json).  

---

## ⚙️ Modeling

- **Model used**: LightGBM Regressor  
- **Hyperparameter tuning**: Conducted with **Optuna** (50 trials) optimizing learning rate, depth, num_leaves, subsample, colsample, regularization, etc.  
- **Final model**: Trained with the best parameters (extended to 2000 estimators for stability).  

📒 Full training process is available in [remodel.ipynb](./remodel.ipynb).

---

## 📊 Results (Validation Set)

The final Optuna-tuned LightGBM achieved:

- **MSE**: 0.001110  
- **RMSE**: 0.033316  
- **R²**: 0.970431  

📈 Scatter plots of **Actual vs Predicted NDVI** confirm strong model performance.  

---

## 💾 Saved Artifacts

The following files are exported in this folder:

- [model.pkl.docx](./model%20pkl.docx) → Final trained LightGBM model (saved as `.docx` for GitHub upload)  
- [preprocessor.pkl](./preprocessor.pkl) → Preprocessing pipeline (scaler + encoders)  
- [feature_names.json](./feature_names.json) → Original feature names  
- `final_model_compressed.pkl` (not uploaded here, used for deployment)  

---

## 🚀 Usage

To use the model, first load the preprocessing pipeline and the trained model:

```python
import joblib

preprocessor = joblib.load("preprocessor.pkl")
model = joblib.load("model.pkl")
```

---

Then, apply the preprocessing pipeline and model to new input data (for unseen governorates) to predict NDVI. This workflow is the same setup that is directly used in the API integration with the website.

