import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import axios from "@/lib/axios";

/* ===========================
   Types & Initial State
=========================== */
export interface SliderItem {
  id: string;
  images: string[];
  link: string;
  text: string;
}

export interface SliderState {
  loading: boolean;
  data: SliderItem[];           // قائمة كل السلايدرات
  selected: SliderItem | null;   // السلايدر المحدد (لصفحة التعديل)
  error: string | null;
}

const initialState: SliderState = {
  loading: true,
  data: [],
  selected: null,
  error: null,
};

/* ===========================
   Async Thunks
=========================== */

// جلب كل السلايدرات (لصفحة العرض)
export const fetchSlider = createAsyncThunk<
  SliderItem[],
  void,
  { rejectValue: string }
>("slider/fetch", async (_, thunkAPI) => {
  try {
    const res = await axios.get("Slider");
    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.title || "فشل تحميل السلايدر"
      );
    }
    return thunkAPI.rejectWithValue("حدث خطأ غير متوقع");
  }
});

// جلب سلايدر واحد بواسطة ID (لصفحة التعديل)
export const fetchSliderById = createAsyncThunk<
  SliderItem,
  number,
  { rejectValue: string }
>("slider/fetchById", async (id, thunkAPI) => {
  try {
    const res = await axios.get(`Slider/${id}`);
    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.title || "فشل تحميل السلايدر"
      );
    }
    return thunkAPI.rejectWithValue("حدث خطأ غير متوقع");
  }
});

// تحديث سلايدر (يدعم رفع الصور)
export interface UpdateSliderPayload {
  Id: number;
  NewImages?: File[];
  ExistingImages?: string[];
  Link: string;
  Text: string;
}

export const updateSlider = createAsyncThunk<
  SliderItem,
  UpdateSliderPayload,
  { rejectValue: string }
>("slider/update", async (payload, thunkAPI) => {
  try {
    const formData = new FormData();
    formData.append("Id", payload.Id.toString());
    formData.append("Link", payload.Link);
    formData.append("Text", payload.Text);

    payload.ExistingImages?.forEach((url) => formData.append("ExistingImages", url));
    payload.NewImages?.forEach((file) => formData.append("NewImages", file));

    const res = await axios.put("Slider", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.title || "فشل تحديث السلايدر"
      );
    }
    return thunkAPI.rejectWithValue("حدث خطأ غير متوقع");
  }
});

/* ===========================
   Slice
=========================== */
const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {
    resetSliderState: () => initialState,
    clearSelectedSlider: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch List
      .addCase(fetchSlider.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSlider.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSlider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "حدث خطأ";
      })

      // Fetch By Id
      .addCase(fetchSliderById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selected = null;
      })
      .addCase(fetchSliderById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchSliderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "حدث خطأ";
      })

      // Update
      .addCase(updateSlider.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSlider.fulfilled, (state, action) => {
        state.loading = false;
        // تحديث القائمة إن وجدت
        const index = state.data.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
        // تحديث المحدد إن كان هو نفسه
        if (state.selected?.id === action.payload.id) {
          state.selected = action.payload;
        }
      })
      .addCase(updateSlider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "حدث خطأ أثناء التحديث";
      });
  },
});

export const { resetSliderState, clearSelectedSlider } = sliderSlice.actions;
export default sliderSlice.reducer;