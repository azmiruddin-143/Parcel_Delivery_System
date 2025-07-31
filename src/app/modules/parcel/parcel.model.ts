import { model, Schema } from "mongoose";
import { IParcel, IParcelStatus, IStatusLog } from "./parcel.interface";


const statusLogSchema = new Schema<IStatusLog>(
  {
    status: {
      type: String,
      enum: Object.values(IParcelStatus),
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      required: true,
    },
    location: {
      type: String,
      trim: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
    },
    note: {
      type: String,
      trim: true,
    },
  },
  { _id: false } // We don't need a separate _id for each status log
);

const parcelSchema = new Schema<IParcel>(
  {
    trackingId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    receiver: {
      name: { type: String, required: true, trim: true },
      phone: { type: String, required: true, trim: true },
      address: { type: String, required: true, trim: true },
      userId: { type: Schema.Types.ObjectId, ref: 'User' }, // Optional reference to User
    },
    parcelType: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
      trim: true,
    },
    currentStatus: {
      type: String,
      enum: Object.values(IParcelStatus),
      default: IParcelStatus.Requested,
      required: true,
    },
    parcelFee: {
      type: Number,
    },
    estimatedDeliveryDate: {
      type: Date,
    },
    isCancelled: {
      type: Boolean,
      default: false,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    statusLogs: {
      type: [statusLogSchema], // An array of statusLog subdocuments
      required: true,
      default: [],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    versionKey: false,
    toJSON: {
      virtuals: true,
    },
  }
);


// parcelSchema.pre('save', function(next) {
//     if (this.isNew && !this.trackingId) {
//         // Simple example, you can make this more robust
//         const date = new Date();
//         const formattedDate = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
//         const randomChars = Math.random().toString(36).substr(2, 6).toUpperCase();
//         this.trackingId = `TRK-${formattedDate}-${randomChars}`;
//     }
//     next();
// });

export const Parcel = model<IParcel>('Parcel', parcelSchema);