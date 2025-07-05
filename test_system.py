#!/usr/bin/env python3
"""
ViMedical System Test Script
Tests backend API endpoints and functionality
"""

import requests
import json
import time
import sys
from datetime import datetime

API_BASE_URL = "http://localhost:8000"
API_V1_URL = f"{API_BASE_URL}/api/v1"

def test_health_check():
    """Test health check endpoint"""
    print("🔍 Testing health check...")
    try:
        response = requests.get(f"{API_BASE_URL}/health", timeout=5)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Health check passed: {data.get('status')}")
            return True
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Health check error: {e}")
        return False

def test_chat_endpoint():
    """Test chat endpoint"""
    print("🔍 Testing chat endpoint...")
    try:
        payload = {
            "message": "Tôi bị đau đầu và sốt",
            "previous_symptoms": ""
        }
        
        response = requests.post(
            f"{API_V1_URL}/chat", 
            json=payload, 
            timeout=30
        )
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Chat endpoint passed")
            print(f"   Response: {data.get('response', '')[:100]}...")
            print(f"   Symptoms: {data.get('symptoms', '')}")
            print(f"   Possible diseases: {data.get('possible_diseases', [])}")
            return True
        else:
            print(f"❌ Chat endpoint failed: {response.status_code}")
            print(f"   Response: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Chat endpoint error: {e}")
        return False

def test_session_creation():
    """Test session creation"""
    print("🔍 Testing session creation...")
    try:
        response = requests.post(f"{API_V1_URL}/session/new", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            session_id = data.get('session_id')
            print(f"✅ Session creation passed: {session_id}")
            return session_id
        else:
            print(f"❌ Session creation failed: {response.status_code}")
            return None
    except Exception as e:
        print(f"❌ Session creation error: {e}")
        return None

def test_session_messages(session_id):
    """Test getting session messages"""
    print("🔍 Testing session messages...")
    try:
        response = requests.get(
            f"{API_V1_URL}/session/{session_id}/messages", 
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            messages = data.get('messages', [])
            print(f"✅ Session messages passed: {len(messages)} messages")
            return True
        else:
            print(f"❌ Session messages failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Session messages error: {e}")
        return False

def test_full_conversation():
    """Test a full conversation flow"""
    print("🔍 Testing full conversation flow...")
    
    # Create session
    session_id = test_session_creation()
    if not session_id:
        return False
    
    # Test multiple messages
    messages = [
        "Tôi bị đau đầu",
        "Tôi còn bị sốt nữa",
        "Các triệu chứng này có nghiêm trọng không?"
    ]
    
    previous_symptoms = ""
    
    for i, message in enumerate(messages, 1):
        print(f"   Message {i}: {message}")
        
        try:
            payload = {
                "message": message,
                "session_id": session_id,
                "previous_symptoms": previous_symptoms
            }
            
            response = requests.post(
                f"{API_V1_URL}/chat", 
                json=payload, 
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                previous_symptoms = data.get('symptoms', previous_symptoms)
                print(f"   ✅ Response: {data.get('response', '')[:50]}...")
                time.sleep(1)  # Wait between messages
            else:
                print(f"   ❌ Failed: {response.status_code}")
                return False
                
        except Exception as e:
            print(f"   ❌ Error: {e}")
            return False
    
    # Test getting session messages
    test_session_messages(session_id)
    
    print("✅ Full conversation test passed")
    return True

def main():
    """Main test runner"""
    print("🏥 ViMedical System Test")
    print("=" * 40)
    print(f"Testing API at: {API_BASE_URL}")
    print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()
    
    # Check if backend is running
    print("📡 Checking backend connection...")
    try:
        response = requests.get(API_BASE_URL, timeout=5)
        print("✅ Backend is running")
    except Exception as e:
        print(f"❌ Backend not accessible: {e}")
        print("Please make sure the backend is running on port 8000")
        sys.exit(1)
    
    print()
    
    # Run tests
    tests = [
        ("Health Check", test_health_check),
        ("Chat Endpoint", test_chat_endpoint),
        ("Session Creation", lambda: test_session_creation() is not None),
        ("Full Conversation", test_full_conversation),
    ]
    
    results = []
    
    for test_name, test_func in tests:
        print(f"🧪 Running {test_name}...")
        try:
            result = test_func()
            results.append((test_name, result))
            print()
        except Exception as e:
            print(f"❌ {test_name} failed with exception: {e}")
            results.append((test_name, False))
            print()
    
    # Summary
    print("📊 Test Results Summary")
    print("=" * 40)
    
    passed = 0
    total = len(results)
    
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} {test_name}")
        if result:
            passed += 1
    
    print()
    print(f"Total: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! ViMedical system is working correctly.")
        sys.exit(0)
    else:
        print("⚠️  Some tests failed. Please check the backend configuration.")
        sys.exit(1)

if __name__ == "__main__":
    main()
