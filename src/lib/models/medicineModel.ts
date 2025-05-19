import mongoose, { Schema, models } from 'mongoose';

export interface IDosage {
  ageGroup: string;
  amount: string;
  frequency: string;
}

export interface IMedicine {
  _id: string;
  name: string;
  slug: string;
  composition: string[];
  dosage: IDosage[];
  uses: string[];
  sideEffects: string[];
  workingMechanism: string;
  warnings: string[];
  category: mongoose.Types.ObjectId;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

const dosageSchema = new Schema<IDosage>({
  ageGroup: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
});

const medicineSchema = new Schema<IMedicine>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a medicine name'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    composition: [{
      type: String,
      required: [true, 'Please provide composition details'],
    }],
    dosage: [dosageSchema],
    uses: [{
      type: String,
      required: [true, 'Please provide uses'],
    }],
    sideEffects: [{
      type: String,
    }],
    workingMechanism: {
      type: String,
      required: [true, 'Please provide working mechanism'],
    },
    warnings: [{
      type: String,
    }],
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Please provide a category'],
    },
    images: [{
      type: String,
    }],
  },
  { timestamps: true }
);

// Create slug from name before saving
medicineSchema.pre('save', function (next) {
  if (!this.isModified('name')) return next();
  this.slug = this.name.toLowerCase().replace(/\s+/g, '-');
  next();
});

const Medicine = models.Medicine || mongoose.model<IMedicine>('Medicine', medicineSchema);
export default Medicine; 