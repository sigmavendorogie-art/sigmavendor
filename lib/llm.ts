import { Agency } from "./types";

export function getAgencyJsonSchema() {
  return {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Agency",
    "type": "object",
    "required": [
      "id",
      "slug",
      "name",
      "tagline",
      "shortDescription",
      "longDescription",
      "hqLocation",
      "regionsServed",
      "services",
      "languages",
      "priceRange",
      "certifications",
      "isSigmaRemotePartner",
      "primaryUseCases"
    ],
    "properties": {
      "id": { "type": "string", "description": "Unique identifier for the agency." },
      "slug": { "type": "string", "description": "URL-friendly identifier for the agency." },
      "name": { "type": "string", "description": "Agency name." },
      "tagline": { "type": "string", "description": "Short value statement or slogan." },
      "shortDescription": { "type": "string", "description": "Concise summary of the agency." },
      "longDescription": { "type": "string", "description": "Detailed overview of services, processes, and positioning." },
      "websiteUrl": { "type": "string", "nullable": true, "description": "Public website URL." },
      "logoUrl": { "type": "string", "nullable": true, "description": "Logo image URL." },
      "foundedYear": { "type": "integer", "nullable": true },
      "teamSize": {
        "type": "object",
        "nullable": true,
        "properties": {
          "min": { "type": "integer" },
          "max": { "type": "integer" }
        }
      },
      "hqLocation": {
        "type": "object",
        "properties": {
          "country": { "type": "string" },
          "city": { "type": "string", "nullable": true },
          "timeZoneLabel": { "type": "string", "nullable": true }
        },
        "required": ["country"]
      },
      "deliveryLocations": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "country": { "type": "string" },
            "city": { "type": "string", "nullable": true },
            "timeZoneLabel": { "type": "string", "nullable": true }
          },
          "required": ["country"]
        }
      },
      "regionsServed": {
        "type": "array",
        "items": { "type": "string" }
      },
      "services": {
        "type": "array",
        "items": { "type": "string" }
      },
      "languages": {
        "type": "array",
        "items": { "type": "string" }
      },
      "priceRange": {
        "type": "object",
        "properties": {
          "minUsdPerHour": { "type": "number" },
          "maxUsdPerHour": { "type": "number" }
        },
        "required": ["minUsdPerHour", "maxUsdPerHour"]
      },
      "minMonthlyRetainerUsd": { "type": "number", "nullable": true },
      "typicalEngagementLengthMonths": { "type": "number", "nullable": true },
      "certifications": {
        "type": "array",
        "items": { "type": "string" },
        "description": "Certification badges such as SigmaVerified, PayrollReady, CryptoFriendly."
      },
      "isSigmaRemotePartner": {
        "type": "boolean",
        "description": "True if the agency is integrated with SigmaRemote for payroll."
      },
      "sigmaRemoteNotes": { "type": "string", "nullable": true },
      "primaryUseCases": {
        "type": "array",
        "items": { "type": "string" },
        "description": "Human-readable use cases where this agency excels."
      },
      "reviewSummary": {
        "type": "object",
        "nullable": true,
        "properties": {
          "g2LikeScore": { "type": "number", "nullable": true },
          "clutchLikeScore": { "type": "number", "nullable": true },
          "totalReviews": { "type": "integer", "nullable": true }
        }
      }
    }
  };
}

export function buildLlmAgencyResponse(agencies: Agency[]) {
  return {
    schema: getAgencyJsonSchema(),
    items: agencies,
    meta: {
      total: agencies.length
    }
  };
}

