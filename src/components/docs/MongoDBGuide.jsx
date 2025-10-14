'use client';

import React, { useState } from 'react';
import CollapsibleSection from './CollapsibleSection';

const MongoDBGuide = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  return (
    <div className="docs-section">
      <h2 className="section-title">MongoDB Guide</h2>

      <div className="info-card">
        <h3>MongoDB Basics</h3>
        <p>
          MongoDB is a NoSQL document database that stores data in flexible, JSON-like documents. 
          Instead of tables and rows, MongoDB uses collections and documents.
        </p>
      </div>

      {/* Find Operations */}
      <CollapsibleSection
        id="mongo-find"
        title="find() - Querying Documents"
        isExpanded={expandedSections['mongo-find']}
        toggle={toggleSection}
      >
        <h4>Basic Find</h4>
        <div className="code-block">
          <pre>{`// Find all documents
db.users.find()

// Find specific documents
db.users.find({ age: 30 })

// Find with multiple conditions
db.users.find({ age: { $gt: 25 }, name: "Alice Johnson" })`}</pre>
        </div>

        <h4>Comparison Operators</h4>
        <div className="code-block">
          <pre>{`// Greater than
db.orders.find({ amount: { $gt: 100 } })

// Less than or equal
db.products.find({ price: { $lte: 50 } })

// Not equal
db.users.find({ name: { $ne: "Alice" } })

// In array
db.products.find({ category: { $in: ["Electronics", "Furniture"] } })`}</pre>
        </div>

        <h4>Sort and Limit</h4>
        <div className="code-block">
          <pre>{`// Sort ascending (1) or descending (-1)
db.posts.find().sort({ views: -1 })

// Limit results
db.users.find().limit(5)

// Combine sort and limit
db.posts.find().sort({ views: -1 }).limit(3)`}</pre>
        </div>

        <h4>findOne()</h4>
        <div className="code-block">
          <pre>{`// Find single document
db.users.findOne({ email: "alice@example.com" })

// Find first document matching condition
db.orders.findOne({ amount: { $gt: 1000 } })`}</pre>
        </div>
      </CollapsibleSection>

      {/* Insert Operations */}
      <CollapsibleSection
        id="mongo-insert"
        title="insert() - Adding Documents"
        isExpanded={expandedSections['mongo-insert']}
        toggle={toggleSection}
      >
        <h4>insertOne()</h4>
        <div className="code-block">
          <pre>{`// Insert single document
db.users.insertOne({
  name: "John Doe",
  email: "john@example.com",
  age: 30,
  created_at: new Date()
})`}</pre>
        </div>

        <h4>insertMany()</h4>
        <div className="code-block">
          <pre>{`// Insert multiple documents
db.products.insertMany([
  { name: "Laptop", category: "Electronics", price: 999.99 },
  { name: "Mouse", category: "Electronics", price: 29.99 },
  { name: "Desk", category: "Furniture", price: 199.99 }
])`}</pre>
        </div>
      </CollapsibleSection>

      {/* Update Operations */}
      <CollapsibleSection
        id="mongo-update"
        title="update() - Modifying Documents"
        isExpanded={expandedSections['mongo-update']}
        toggle={toggleSection}
      >
        <h4>updateOne()</h4>
        <div className="code-block">
          <pre>{`// Update single document
db.users.updateOne(
  { name: "John Doe" },
  { $set: { age: 31 } }
)

// Increment a value
db.posts.updateOne(
  { _id: 1 },
  { $inc: { views: 1 } }
)`}</pre>
        </div>

        <h4>updateMany()</h4>
        <div className="code-block">
          <pre>{`// Update multiple documents
db.products.updateMany(
  { category: "Electronics" },
  { $set: { discount: true } }
)

// Update with multiple operations
db.orders.updateMany(
  { status: "pending" },
  { 
    $set: { status: "processing" },
    $currentDate: { updated_at: true }
  }
)`}</pre>
        </div>

        <h4>Update Operators</h4>
        <div className="code-block">
          <pre>{`// $set - Set field value
{ $set: { name: "New Name" } }

// $inc - Increment/decrement
{ $inc: { views: 1, stock: -1 } }

// $push - Add to array
{ $push: { tags: "new-tag" } }

// $pull - Remove from array
{ $pull: { tags: "old-tag" } }

// $unset - Remove field
{ $unset: { temporary_field: "" } }`}</pre>
        </div>
      </CollapsibleSection>

      {/* Delete Operations */}
      <CollapsibleSection
        id="mongo-delete"
        title="delete() - Removing Documents"
        isExpanded={expandedSections['mongo-delete']}
        toggle={toggleSection}
      >
        <div className="code-block">
          <pre>{`// Delete one document
db.users.deleteOne({ name: "John Doe" })

// Delete multiple documents
db.orders.deleteMany({ status: "cancelled" })

// Delete all documents in collection
db.temporary_data.deleteMany({})`}</pre>
        </div>
      </CollapsibleSection>

      {/* Aggregation */}
      <CollapsibleSection
        id="mongo-aggregate"
        title="aggregate() - Advanced Queries"
        isExpanded={expandedSections['mongo-aggregate']}
        toggle={toggleSection}
      >
        <p>Aggregation pipelines process data through multiple stages.</p>

        <div className="code-block">
          <pre>{`// Count documents by category
db.products.aggregate([
  { $group: { _id: "$category", count: { $sum: 1 } } }
])

// Average price by category
db.products.aggregate([
  { 
    $group: { 
      _id: "$category", 
      avgPrice: { $avg: "$price" },
      totalProducts: { $sum: 1 }
    } 
  }
])

// Match, group, and sort
db.orders.aggregate([
  { $match: { amount: { $gt: 50 } } },
  { $group: { _id: "$user_id", totalSpent: { $sum: "$amount" } } },
  { $sort: { totalSpent: -1 } },
  { $limit: 5 }
])`}</pre>
        </div>
      </CollapsibleSection>

      {/* Count Documents */}
      <CollapsibleSection
        id="mongo-count"
        title="countDocuments() - Counting"
        isExpanded={expandedSections['mongo-count']}
        toggle={toggleSection}
      >
        <div className="code-block">
          <pre>{`// Count all documents
db.users.countDocuments()

// Count with filter
db.orders.countDocuments({ amount: { $gt: 100 } })

// Count by category
db.products.countDocuments({ category: "Electronics" })`}</pre>
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default MongoDBGuide;


