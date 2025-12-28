const REQUIRED_FIELDS = [
  "id",
  "brand",
  "product",
  "spf",
  "type",
  "filters"
];

function validateSchema(data) {
  let errors = 0;

  data.forEach((item, index) => {
    REQUIRED_FIELDS.forEach(field => {
      if (!(field in item)) {
        console.error(`❌ Missing required field "${field}" in item #${index}`);
        errors++;
      }
    });

    if (!Array.isArray(item.filters)) {
      console.error(`❌ "filters" is not an array in item #${index}`);
      errors++;
    }
  });

  if (errors > 0) {
    throw new Error(`Schema validation failed with ${errors} error(s)`);
  }

  console.log("✅ Schema validation passed");
}
